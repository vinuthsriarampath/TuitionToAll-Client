import {Component, Inject, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {QuillEditorComponent} from 'ngx-quill';
import {LucideAngularModule, SquarePen} from 'lucide-angular';
import {
  AnnouncementUpdateRequest
} from '../../dtos/request/AnnouncementUpdateRequest';
import {AnnouncementService} from '../../services/announcements/announcement.service';
import {AlertService} from '../../../../core/services/alerts/alert.service';
import {DialogLayoutComponent} from '../../../../core/layouts/dialog-layout/dialog-layout.component';

export interface UpdateAnnouncementContentDialogData {
  id: number;
  title: string;
  description: string;
  expireAt: string;
}

@Component({
  selector: 'app-update-announcement-content-dialog',
  imports: [
    FormsModule,
    QuillEditorComponent,
    ReactiveFormsModule,
    LucideAngularModule,
    DialogLayoutComponent
  ],
  templateUrl: './update-announcement-content-dialog.component.html',
  styleUrl: './update-announcement-content-dialog.component.css'
})
export class UpdateAnnouncementContentDialogComponent {

  protected form!:FormGroup;
  protected loading:boolean = false;

  private readonly originalAnnouncement :UpdateAnnouncementContentDialogData;

  private readonly dialogRef:MatDialogRef<UpdateAnnouncementContentDialogComponent> = inject(MatDialogRef<UpdateAnnouncementContentDialogComponent>)
  private readonly formBuilder = inject(FormBuilder);
  private readonly announcementService = inject(AnnouncementService);
  private readonly alertService = inject(AlertService);

  modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ]
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data:UpdateAnnouncementContentDialogData) {
    this.originalAnnouncement = data;
    this.form = this.initializeForm(data);
  }



  private initializeForm(formData:UpdateAnnouncementContentDialogData):FormGroup{
    return this.formBuilder.group({
      title: [formData.title, Validators.required],
      description: [formData.description, Validators.required],
      expireAt: [formData.expireAt, Validators.required],
    })
  }

  onCancel() {
    this.dialogRef.close();
  }

  onReset() {
    this.form = this.initializeForm(this.originalAnnouncement);
  }

  onSubmit() {
    if (this.form.invalid) return;

    const request:AnnouncementUpdateRequest = this.form.value
    this.triggerLoading();
    this.announcementService.updateAnnouncement(this.originalAnnouncement.id, request).subscribe({
      next: (res) =>{
        if(res.data){
          this.triggerLoading();
          this.alertService.triggerSuccessAlert('Announcement content updated successfully');
          this.dialogRef.close(res.data)
        }
      },
      error: (err) => {
        this.triggerLoading();

        const errors = err.error?.errors;

        if (errors) {
          errors.forEach((e: any) => {
            this.form.get(e.field)?.setErrors({
              server: e.message
            });
          });
        }else{
          this.form.setErrors({server: err.error.message()});
        }
      }
    })
  }

  private triggerLoading():void{
    this.loading = !this.loading;

    if(this.loading){
      this.form.disable({emitEvent:false});
    }else{
      this.form.enable();
    }
  }

  protected readonly SquarePen = SquarePen;
}
