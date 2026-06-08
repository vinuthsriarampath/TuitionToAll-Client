import {Component, Inject, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AlertService} from '../../../../../../../../../../../../../core/services/alerts/alert.service';
import {FormErrorHandler} from '../../../../../../../../../../../../../shared/utils/helpers/FormErrorHandler';
import {ResourceService} from '../../../../../../../../../../../../../core/services/resource/resource.service';
import {
  ResourceInitRequest
} from '../../../../../../../../../../../../../core/dto/request-dto/resource/ResourceInitRequest';
import {
  DialogLayoutComponent
} from '../../../../../../../../../../../../../core/layouts/dialog-layout/dialog-layout.component';
import {BookCopy} from 'lucide-angular';
import {InputComponent} from '../../../../../../../../../../../../../shared/ui/input/input.component';
import {FileInputComponent} from '../../../../../../../../../../../../../shared/ui/file-input/file-input.component';
import {NgIf} from '@angular/common';
import {lastValueFrom} from 'rxjs';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-resource-create',
  imports: [
    DialogLayoutComponent,
    ReactiveFormsModule,
    InputComponent,
    FileInputComponent,
    NgIf
  ],
  templateUrl: './resource-create.component.html',
  styleUrl: './resource-create.component.css'
})
export class ResourceCreateComponent {

  protected uploadProgress:number = 0;
  protected isUploading:boolean = false;
  protected form!: FormGroup;

  private readonly CHUNK_SIZE = 5 * 1024 * 1024;
  private readonly MAX_CHUNK_RETRIES = 3;

  private readonly chapterId!: number;

  private readonly dialogRef: MatDialogRef<ResourceCreateComponent> = inject(MatDialogRef<ResourceCreateComponent>);
  private readonly alertService: AlertService = inject(AlertService);
  private readonly formBuilder:FormBuilder = inject(FormBuilder);
  private readonly formErrorHandler:FormErrorHandler = inject(FormErrorHandler);
  private readonly resourceService:ResourceService = inject(ResourceService);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data: number) {
    this.chapterId = data;
    this.form = this.initializeForm();
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      name: ['',Validators.required],
      chapterId: [this.chapterId,Validators.required],
      file: new FormControl<File | null>(null, Validators.required)
    });
  }

  protected onCancel(): void {
    this.dialogRef.close();
  }

  protected onReset(): void {
    this.form = this.initializeForm();
  }

  protected async onSubmit(): Promise<void> {
    if(this.form.invalid) {
      this.form.markAsTouched();
      return;
    }

    if(!this.form.get('file')?.value){
      this.form.get('file')?.setErrors({
        required: `Please select a file to upload!`
      });
    }

    try {
      this.isUploading = true;
      this.uploadProgress = 0;

      const file = this.form.get('file')?.value as File;

      const chunks:Blob[] = this.createChunks(file);

      const request:ResourceInitRequest = {
        name : this.form.value.name,
        chapterId: this.form.value.chapterId,
        originalFileName: file.name,
        totalSize: file.size,
        totalChunks: chunks.length,
      }

      const initResponse = await lastValueFrom(this.resourceService.initializeUpload(request));

      if (!initResponse.data?.uploadId) {
        this.alertService.triggerErrorAlert('initializeUpload response missing uploadId');
        return;
      }

      const uploadId = initResponse.data.uploadId;

      for (let i = 0; i < chunks.length; i++) {
        await this.uploadChunk(uploadId, i, chunks[i], chunks.length);
      }

      const completeUpload = await lastValueFrom(this.resourceService.completeUpload(uploadId));

      if(completeUpload.data){
        this.alertService.triggerSuccessAlert('File uploaded successfully!');
        this.dialogRef.close(completeUpload.data);
      }else{
        this.alertService.triggerErrorAlert('File upload failed!');
      }

    }catch(error){
      this.formErrorHandler.handle(error,this.form,()=>{});
    }finally {
      this.isUploading = false;
    }

  }

  private createChunks(file:File):Blob[]{
    const chunks:Blob[] = [];

    let start:number = 0;

    while (start < file.size){
      const end = Math.min( start + this.CHUNK_SIZE, file.size );
      chunks.push( file.slice(start, end) );
      start = end;
    }

    return chunks;
  }

  private async uploadChunk(uploadId: string, chunkIndex: number, chunk: Blob, totalChunks: number): Promise<void> {

    let retryCount = 0;

    while (retryCount < this.MAX_CHUNK_RETRIES) {
      try {
        await new Promise<void>((resolve, reject) => {
          this.resourceService.uploadChunk(uploadId, chunkIndex, chunk).subscribe({
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
        console.warn('Retrying uploading..');
        if (retryCount >= this.MAX_CHUNK_RETRIES) {
          throw error;
        }
      }
    }
  }

  protected readonly BookCopy = BookCopy;

}
