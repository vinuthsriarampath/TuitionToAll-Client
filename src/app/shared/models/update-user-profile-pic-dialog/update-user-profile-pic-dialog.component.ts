import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ProfileFileServiceService} from '../../../core/services/profile-files/profile-file-service.service';
import {User} from '../../../core/models/user-models/user';
import {DialogLayoutComponent} from '../../../core/layouts/dialog-layout/dialog-layout.component';
import {ImageIcon} from 'lucide-angular';
import {AlertService} from '../../../core/services/alerts/alert.service';

@Component({
  selector: 'app-update-user-profile-pic-dialog',
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    DialogLayoutComponent
  ],
  templateUrl: './update-user-profile-pic-dialog.component.html',
  styleUrl: './update-user-profile-pic-dialog.component.css'
})
export class UpdateUserProfilePicDialogComponent {

  userDetails!: any;
  imageUrl: string = '';
  selectedFile: File | null = null;
  isLoading: boolean = false;

  profileService:ProfileFileServiceService =  inject(ProfileFileServiceService);
  private readonly alertService:AlertService = inject(AlertService);

  constructor(
    public dialogRef: MatDialogRef<UpdateUserProfilePicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      userRole: string;
      details: User;
    }) {
    this.userDetails = {...data.details};
  }

  onConfirm(){
    this.dialogRef.close(this.userDetails);
  }

  onCancel(){
    this.dialogRef.close();
  }

  selectImage = (file: File)=> {
    this.imageUrl = URL.createObjectURL(file);
    this.selectedFile = file;
  }

  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectImage(file);
    }
  }

  onSubmit(){
    this.triggerLoading();

    if(!this.selectedFile){
      console.log('No file selected');
      this.triggerLoading();
      this.onCancel();
      return;
    }

    this.profileService.uploadFile('dp',this.selectedFile).subscribe(
      {
        next: (res) =>{
          if (res.data) {
            this.userDetails.dp = res.data;
          }
          this.triggerLoading();
          this.onConfirm();
        },
        error: (err) =>{
          this.triggerLoading();
          this.alertService.triggerErrorAlert(err.error.message);
        }
      }
    )
  }

  onReset(){
    this.imageUrl = '';
    this.selectedFile = null;
  }

  private triggerLoading(){
    this.isLoading = !this.isLoading;
  }

  protected readonly ImageIcon = ImageIcon;
}
