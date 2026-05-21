import {Component, Inject, inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  LectureRecordService
} from '../../../../../../../../../../../../../core/services/lecture-record/lecture-record.service';
import {AlertService} from '../../../../../../../../../../../../../core/services/alerts/alert.service';
import {
  DialogLayoutComponent
} from '../../../../../../../../../../../../../core/layouts/dialog-layout/dialog-layout.component';
import {Upload} from 'lucide-angular';
import {InputComponent} from '../../../../../../../../../../../../../shared/ui/input/input.component';
import {NgIf} from '@angular/common';
import {getDate} from '../../../../../../../../../../../../../core/helpers/date-helper';
import {lastValueFrom} from 'rxjs';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-lecture-record-upload',
  imports: [
    DialogLayoutComponent,
    ReactiveFormsModule,
    InputComponent,
    NgIf
  ],
  templateUrl: './lecture-record-upload.component.html',
  styleUrl: './lecture-record-upload.component.css'
})
export class LectureRecordUploadComponent implements OnDestroy{
  private readonly CHUNK_SIZE = 5 * 1024 * 1024;
  private readonly MAX_CHUNK_RETRIES = 3;
  private readonly chapterId!:number;

  protected form!:FormGroup;
  protected videoUrl:string ='';
  protected selectedFile: File | null = null;
  protected uploadProgress:number = 0;
  protected isUploading:boolean = false;


  private readonly dialogRef:MatDialogRef<LectureRecordUploadComponent> = inject(MatDialogRef<LectureRecordUploadComponent>);
  private readonly formBuilder:FormBuilder = inject(FormBuilder);
  private readonly lectureRecordService = inject(LectureRecordService);
  private readonly alertService:AlertService = inject(AlertService);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data:number) {
    this.chapterId = data;
    this.form = this.initializeForm();
  }

  private initializeForm():FormGroup{
    return this.formBuilder.group({
      title: ['',Validators.required],
      chapterId: [this.chapterId,Validators.required],
      recordedDate: [getDate(),Validators.required]
    })
  }

  protected onCancel():void{
    this.dialogRef.close();
  }

  protected onReset():void{
    this.form = this.initializeForm();
  }

  protected async onSubmit(): Promise<void> {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.selectedFile) {
      this.alertService.triggerErrorAlert('Please select a video file');
      return;
    }

    try {
      this.isUploading = true;
      this.uploadProgress = 0;

      const file = this.selectedFile;

      const chunks = this.createChunks(file);

      const initializeResponse =
        await lastValueFrom(
          this.lectureRecordService.initializeUpload({
            title: this.form.value.title,
            recordedDate: this.form.value.recordedDate,
            chapterId: this.chapterId,
            originalFileName: file.name,
            totalSize: file.size,
            totalChunks: chunks.length
          })
        );

      const uploadId = initializeResponse.data?.uploadId;
      if (!uploadId) {
        this.alertService.triggerErrorAlert('initializeUpload response missing uploadId');
        return;
      }

      for (let i = 0; i < chunks.length; i++) {
        await this.uploadChunk(uploadId, i, chunks[i], chunks.length);
      }

      const lectureRecord = await lastValueFrom(this.lectureRecordService.completeUpload(uploadId));
      this.alertService.triggerSuccessAlert('Lecture recording uploaded successfully');
      this.dialogRef.close(lectureRecord.data);
    } catch (error) {
      console.error(error);
      this.alertService.triggerErrorAlert('Error uploading lecture recording');
    } finally {
      this.isUploading = false;
    }
  }

  private async uploadChunk(uploadId: string, chunkIndex: number, chunk: Blob, totalChunks: number): Promise<void> {

    let retryCount = 0;

    while (retryCount < this.MAX_CHUNK_RETRIES) {
      try {
        await new Promise<void>((resolve, reject) => {
          this.lectureRecordService.uploadChunk(uploadId, chunkIndex, chunk).subscribe({
            next: (event) => {
              if (event.type === HttpEventType.UploadProgress) {
                const chunkProgress = Math.round((event.loaded / (event.total || 1)) * 100);
                const overallProgress = ((chunkIndex + (chunkProgress / 100)) / totalChunks) * 100;
                this.uploadProgress = Math.round(overallProgress);
              }
              if (event.type === HttpEventType.Response) {
                resolve();
              }
            },
            error: (error) => {
              reject(error);
            }
          });
        });

        return;

      } catch (error) {
        retryCount++;
        console.warn(`Retrying chunk ${chunkIndex} (${retryCount})`);
        if (retryCount >= this.MAX_CHUNK_RETRIES) {
          throw error;
        }
      }
    }
  }


  selectVideo = (file: File)=> {
    this.videoUrl = URL.createObjectURL(file);
    this.selectedFile = file;
  }

  onVideoSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectVideo(file);
    }
  }

  private createChunks(file: File): Blob[] {

    const chunks: Blob[] = [];

    let start = 0;

    while (start < file.size) {
      const end = Math.min( start + this.CHUNK_SIZE, file.size );
      chunks.push( file.slice(start, end) );
      start = end;
    }

    return chunks;
  }

  ngOnDestroy(): void {
    if (this.videoUrl) {
      URL.revokeObjectURL(this.videoUrl);
    }
  }

  protected readonly Upload = Upload;
}
