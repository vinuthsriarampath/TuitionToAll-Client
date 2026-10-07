import {Component, inject, input, OnInit, output, signal} from '@angular/core';
import {PostResponse} from '@features/posts/dtos/responses/post-response';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PostMediaType} from '@features/posts/enums/post-media-type';
import {PostService} from '@features/posts/services/post-service/post.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {PostVisibility} from '@features/posts/enums/post-visibility';
import {PostMediaItemRequest} from '@features/posts/dtos/requests/post-media-item-request';
import {PostCreateRequest} from '@features/posts/dtos/requests/post-create-request';
import { Files, Image, LucideAngularModule, Send, X} from 'lucide-angular';
import {CardShellComponent, SelectComponent, SelectOption} from '@shared/ui';
import {PostCreateStatus} from '@features/posts/dtos/requests/enums/post-create-status';
import {NgOptimizedImage} from '@angular/common';
import {ChapterStatus} from '@features/chapter/enums/ChapterStatus';
import {UserHelper} from '@shared/utils/helpers/user-helper';
import {User} from '@features/user/dtos/responses/user';
import {UserService} from '@features/user/services/user/user.service';

interface SelectedFile {
  file: File;
  previewUrl: string;
  mediaType: PostMediaType;
}

@Component({
  selector: 'app-post-create',
  imports: [
    LucideAngularModule,
    ReactiveFormsModule,
    CardShellComponent,
    NgOptimizedImage,
    SelectComponent
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit{
  placeholderText = input<string>("What's on your mind?");

  postCreated = output<PostResponse>();

  protected currentUser!:User;
  protected postForm!: FormGroup;
  protected isSubmitting = signal<boolean>(false);
  protected selectedFiles = signal<SelectedFile[]>([]);
  protected createPost:boolean = false;

  protected readonly postVisibilityOptions:SelectOption[] = [];

  private readonly fb = inject(FormBuilder);
  private readonly postService = inject(PostService);
  private readonly alertService = inject(AlertService);
  private readonly userService = inject(UserService);

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    const postVisibility:PostVisibility[] = Object.values(PostVisibility);
    for (let visibility of postVisibility){
      this.postVisibilityOptions.push({label:visibility.toLowerCase(),value:visibility})
    }
    this.initializeForm();
  }

  initializeForm():void{
    this.postForm = this.fb.group({
      caption: ['', [Validators.required, Validators.maxLength(2000)]],
      visibility: [PostVisibility.PUBLIC, [Validators.required]]
    });

  }

  onFileSelected(event: Event, defaultType: PostMediaType): void {
    const inputEl = event.target as HTMLInputElement;
    if (!inputEl.files || inputEl.files.length === 0) return;

    const filesArray = Array.from(inputEl.files);
    const updatedFiles = [...this.selectedFiles()];

    filesArray.forEach((file) => {
      const type = defaultType === PostMediaType.IMAGE && file.type.startsWith('image/')
        ? PostMediaType.IMAGE
        : PostMediaType.DOCUMENT;

      const previewUrl = type === PostMediaType.IMAGE ? URL.createObjectURL(file) : '';
      updatedFiles.push({ file, previewUrl, mediaType: type });
    });

    this.selectedFiles.set(updatedFiles);
    inputEl.value = ''; // Reset file input element
  }

  removeFile(index: number): void {
    const files = [...this.selectedFiles()];
    const removed = files.splice(index, 1)[0];
    if (removed?.previewUrl) {
      URL.revokeObjectURL(removed.previewUrl);
    }
    this.selectedFiles.set(files);
  }

  onSubmit(status: PostCreateStatus = PostCreateStatus.PUBLISHED): void {
    if (this.postForm.invalid && this.selectedFiles().length === 0) {
      return;
    }

    this.isSubmitting.set(true);

    const mediaItems: PostMediaItemRequest[] = this.selectedFiles().map((sf, idx) => ({
      mediaType: sf.mediaType,
      fileOrder: idx + 1
    }));

    const request: PostCreateRequest = {
      caption: this.postForm.value.caption,
      visibility: this.postForm.value.visibility,
      status: status,
      mediaItems: mediaItems
    };

    const rawFiles = this.selectedFiles().map((sf) => sf.file);

    this.postService.createPost(request, rawFiles).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.alertService.triggerSuccessAlert('Post created successfully!');
        this.resetForm();
        if (res.data) {
          this.createPost = false;
          this.postCreated.emit(res.data);
        }
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.alertService.triggerErrorAlert(err.error?.message ?? 'Failed to create post');
      }
    });
  }

  private resetForm(): void {
    this.postForm.reset({ visibility: PostVisibility.PUBLIC, caption: '' });
    this.selectedFiles().forEach((f) => {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
    });
    this.selectedFiles.set([]);
  }

  protected triggerCreatePost(){
    this.createPost = true;
  }

  protected readonly X = X;
  protected readonly PostMediaType = PostMediaType;
  protected readonly Image = Image;
  protected readonly Send = Send;
  protected readonly Files = Files;
  protected readonly PostCreateStatus = PostCreateStatus;
  protected readonly UserHelper = UserHelper;
}
