import {Component, Inject, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { environment } from "@env/environment.development";
import {PostUpdateRequest} from '@features/posts/dtos/requests/post-update-request';
import { PostMediaType } from "@features/posts/enums/post-media-type";
import { PostVisibility } from "@features/posts/enums/post-visibility";
import {PostStatus} from '@features/posts/enums/post-status';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PostResponse} from '@features/posts/dtos/responses/post-response';
import { PostService } from "@features/posts/services/post-service/post.service";
import {AlertService} from '@core/services/alerts/alert.service';
import {SelectComponent, SelectOption} from '@shared/ui';
import {Edit3, Files, Image, LucideAngularModule, RotateCcw, Send, X} from 'lucide-angular';
import {DialogLayoutComponent} from '@core/layouts';

export interface SelectedEditFile {
  file?: File;
  previewUrl: string;
  mediaType: PostMediaType;
  isExisting: boolean;
  mediaId?: number;
  fileName?: string;
  isMarkedForRemoval?: boolean; // Track visual removal state
}

@Component({
  selector: 'app-post-update-dialog',
  imports: [
    LucideAngularModule,
    SelectComponent,
    ReactiveFormsModule,
    DialogLayoutComponent
  ],
  templateUrl: './post-update-dialog.component.html',
  styleUrl: './post-update-dialog.component.css'
})
export class PostUpdateDialogComponent {
  protected form!: FormGroup;
  protected loading = signal<boolean>(false);
  protected selectedFiles = signal<SelectedEditFile[]>([]);

  protected readonly postVisibilityOptions: SelectOption[] = [];
  protected readonly postStatusOptions: SelectOption[] = [];

  private readonly fb = inject(FormBuilder);
  private readonly postService = inject(PostService);
  private readonly alertService = inject(AlertService);
  private readonly dialogRef = inject(MatDialogRef<PostUpdateDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public readonly post: PostResponse) {
    this.initOptions();
    this.initializeForm();
    this.loadExistingMedia();
  }

  private initOptions(): void {
    Object.values(PostVisibility).forEach(v => {
      this.postVisibilityOptions.push({ label: v.toLowerCase().replace('_', ' '), value: v });
    });
    Object.values(PostStatus).forEach(s => {
      this.postStatusOptions.push({ label: s.toLowerCase(), value: s });
    });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      caption: [this.post.caption || ''],
      visibility: [this.post.visibility || PostVisibility.PUBLIC, [Validators.required]],
      status: [this.post.status || PostStatus.PUBLISHED, [Validators.required]]
    });
  }

  private loadExistingMedia(): void {
    if (!this.post.mediaList) return;

    const initialFiles: SelectedEditFile[] = this.post.mediaList.map(media => ({
      previewUrl: media.mediaType === PostMediaType.IMAGE ? `${environment.POST_API}/media/${media.mediaUrl}` : '',
      mediaType: media.mediaType,
      isExisting: true,
      mediaId: media.id,
      fileName: media.mediaUrl,
      isMarkedForRemoval: false // Initially not marked for removal
    }));

    this.selectedFiles.set(initialFiles);
  }

  protected onFileSelected(event: Event, defaultType: PostMediaType): void {
    const inputEl = event.target as HTMLInputElement;
    if (!inputEl.files || inputEl.files.length === 0) return;

    const filesArray = Array.from(inputEl.files);
    const updated = [...this.selectedFiles()];

    // Newly selected files are appended strictly to the end of the list
    filesArray.forEach(file => {
      const type = defaultType === PostMediaType.IMAGE && file.type.startsWith('image/')
        ? PostMediaType.IMAGE
        : PostMediaType.DOCUMENT;

      const previewUrl = type === PostMediaType.IMAGE ? URL.createObjectURL(file) : '';
      updated.push({ file, previewUrl, mediaType: type, isExisting: false, isMarkedForRemoval: false });
    });

    this.selectedFiles.set(updated);
    inputEl.value = '';
  }

  // Toggles removal flag for existing files, or deletes newly added files entirely from the list
  protected toggleRemoveOrDeleteFile(index: number): void {
    const files = [...this.selectedFiles()];
    const targetFile = files[index];

    if (targetFile.isExisting) {
      // Toggle removal status instead of splicing out visually
      targetFile.isMarkedForRemoval = !targetFile.isMarkedForRemoval;
      this.selectedFiles.set(files);
    } else {
      // For newly added local files, remove completely from list and revoke blob preview URL
      const removed = files.splice(index, 1)[0];
      if (removed.previewUrl) {
        URL.revokeObjectURL(removed.previewUrl);
      }
      this.selectedFiles.set(files);
    }
  }

  protected onCancel(): void {
    this.cleanupPreviews();
    this.dialogRef.close(false);
  }

  protected onSubmit(): void {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.form.disable({ emitEvent: false });

    // Collect IDs of existing media currently marked for removal
    const removeMediaIds = this.selectedFiles()
      .filter(f => f.isExisting && f.isMarkedForRemoval && f.mediaId)
      .map(f => f.mediaId!);

    // Collect newly added local files for upload
    const newFilesList = this.selectedFiles().filter(f => !f.isExisting);

    // Build metadata mapping for new files
    const newMediaItems = newFilesList.map(f => ({
      mediaType: f.mediaType,
      fileOrder: this.selectedFiles().indexOf(f) + 1 - removeMediaIds.length
    }));

    console.log(newMediaItems)

    const request: PostUpdateRequest = {
      caption: this.form.value.caption,
      visibility: this.form.value.visibility,
      status: this.form.value.status,
      removeMediaIds: removeMediaIds,
      newMediaItems: newMediaItems
    };

    const rawFiles = newFilesList.map(f => f.file!).filter(Boolean);

    this.postService.updatePost(this.post.id, request, rawFiles).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.alertService.triggerSuccessAlert('Post updated successfully!');
        this.cleanupPreviews();
        this.dialogRef.close(res.data);
      },
      error: (err) => {
        this.loading.set(false);
        this.form.enable({ emitEvent: false });
        this.alertService.triggerErrorAlert(err.error?.message || 'Failed to update post');
      }
    });
  }

  private cleanupPreviews(): void {
    this.selectedFiles().forEach(f => {
      if (!f.isExisting && f.previewUrl) {
        URL.revokeObjectURL(f.previewUrl);
      }
    });
  }

  protected getMediaUrl(filename: string): string {
    return `${environment.POST_API}/media/${filename}`;
  }

  protected readonly PostMediaType = PostMediaType;
  protected readonly Edit3 = Edit3;
  protected readonly Send = Send;
  protected readonly Files = Files;
  protected readonly Image = Image;
  protected readonly X = X;
  protected readonly RotateCcw = RotateCcw;
}
