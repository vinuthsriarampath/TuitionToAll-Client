import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ProfileFileServiceService} from '../../services/profile-files/profile-file-service.service';
import {User} from '../../dtos/response/user';
import {DialogLayoutComponent} from '../../../../core/layouts/dialog-layout/dialog-layout.component';
import {ImageIcon} from 'lucide-angular';
import {AlertService} from '../../../../core/services/alerts/alert.service';

@Component({
  selector: 'app-update-profile-banner-dialog',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    DialogLayoutComponent
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

  private readonly alertService:AlertService = inject(AlertService);

  constructor(
    public dialogRef:MatDialogRef<UpdateProfileBannerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{
    serRole: string;
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

  onSubmit(){
    this.triggerLoading();

    if(!this.selectedFile){
      this.triggerLoading();
      this.onCancel();
      return;
    }

    this.profileService.uploadFile('banner',this.selectedFile).subscribe(
      {
        next: (res) =>{
          if (res.data) {
            this.userDetails.banner = res.data as string;
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

  protected readonly ImageIcon = ImageIcon;
}
