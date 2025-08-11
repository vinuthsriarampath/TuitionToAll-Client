import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Institute} from '../../../core/models/user-models/sub-user-models/institute';
import {Teacher} from '../../../core/models/user-models/sub-user-models/teacher';
import {Student} from '../../../core/models/user-models/sub-user-models/student';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ProfileFileServiceService} from '../../../core/services/profile-files/profile-file-service.service';

@Component({
  selector: 'app-update-profile-banner-dialog',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './update-profile-banner-dialog.component.html',
  styleUrl: './update-profile-banner-dialog.component.css'
})
export class UpdateProfileBannerDialogComponent {

  userDetails!: any;
  isLoading: boolean = false;

  imageUrl:string ='';
  selectedFile: File | null = null;

  profileService:ProfileFileServiceService = inject(ProfileFileServiceService);

  constructor(
    public dialogRef:MatDialogRef<UpdateProfileBannerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{
    serRole: string;
    details: Institute|Teacher|Student;
  }) {
    this.userDetails = {...data.details};
  }

  onConfirm(){
    this.dialogRef.close(this.userDetails);
  }

  onCancel(){
    this.dialogRef.close();
  }

  onSubmit(){
    this.triggerLoading();

    if(!this.selectedFile){
      console.log('No file selected');
      this.triggerLoading();
      this.onCancel();
      return;
    }

    this.profileService.uploadFile('banner',this.selectedFile).subscribe(
      {
        next: (res) =>{
          if (res.data) {
            this.data.details.banner = res.data as string;
          }
          this.triggerLoading();
          this.onConfirm();
        },
        error: (err) =>{
          this.triggerLoading();
          this.onCancel();
        }
      }
    )
  }

  selectImage(file:File){
    this.imageUrl = URL.createObjectURL(file);
    this.selectedFile = file;
  }

  onImageSelect(event:Event):void{
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      const file = input.files[0];
      this.selectImage(file);
    }
  }

  onReset(){
    this.imageUrl = '';
    this.selectedFile = null;
  }

  private triggerLoading(){
    this.isLoading = !this.isLoading;
  }
}
