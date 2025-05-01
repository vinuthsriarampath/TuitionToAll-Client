import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {Institute} from '../../../core/models/user-models/sub-user-models/institute';
import {Teacher} from '../../../core/models/user-models/sub-user-models/teacher';
import {Student} from '../../../core/models/user-models/sub-user-models/student';
import {NgIf} from '@angular/common';
import {
  InstituteDetailsUpdateRequest
} from '../../../core/dto/request-dto/update-user-dto/sub-user-details-update-dto/InstituteDetailsUpdateRequest';
import {
  TeacherDetailsUpdateRequest
} from '../../../core/dto/request-dto/update-user-dto/sub-user-details-update-dto/TeacherDetailsUpdateRequest';
import {
  StudentDetailsUpdateRequest
} from '../../../core/dto/request-dto/update-user-dto/sub-user-details-update-dto/StudentDetailsUpdateRequest';
import {UserService} from '../../../core/services/user/user.service';

@Component({
  selector: 'app-update-profile-dialog',
  imports: [
    FormsModule,
    NgIf,
  ],
  templateUrl: './update-profile-dialog.component.html',
  styleUrl: './update-profile-dialog.component.css'
})
export class UpdateProfileDialogComponent {

  userDetails!: any;
  isLoading: boolean = false;

  userService:UserService = inject(UserService);

  constructor(
    public dialogRef:MatDialogRef<UpdateProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{
      userRole: string;
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

  onSubmit() {
    const updateRequest = this.createUpdateRequest();
    if (updateRequest) {
      if (this.data.userRole=='institute') {
        this.triggerLoading();
        this.userService.updateInstituteDetails(updateRequest).subscribe({
          next:():void =>{
            this.triggerLoading();
            this.onConfirm();
          },
          error:():void =>{
            this.triggerLoading();
            this.onCancel();
          }
        })
      }else if(this.data.userRole=='teacher'){
        this.triggerLoading();
        this.userService.updateTeacherDetails(updateRequest).subscribe({
          next:() =>{
            this.triggerLoading();
            this.onConfirm();
          },
          error:()=>{
            this.triggerLoading();
            this.onCancel();
          }
        })
      }else if(this.data.userRole=='student'){
        this.triggerLoading();
        this.userService.updateStudentDetails(updateRequest).subscribe({
          next:() =>{
            this.triggerLoading();
            this.onConfirm();
          },
          error:()=>{
            this.triggerLoading();
            this.onCancel();
          }
        })
      }
    }
  }

  private triggerLoading(){
    this.isLoading = !this.isLoading;
  }

  private createUpdateRequest(): InstituteDetailsUpdateRequest | TeacherDetailsUpdateRequest | StudentDetailsUpdateRequest | null {
    switch (this.data.userRole) {
      case 'institute':
        return {
          instituteName: this.userDetails.instituteName,
          address: this.userDetails.address,
          contact: this.userDetails.contact,
        } as InstituteDetailsUpdateRequest;
      case 'teacher':
        return {
          firstName: this.userDetails.firstName,
          lastName: this.userDetails.lastName,
          dob: this.userDetails.dob,
          address: this.userDetails.address,
          contact: this.userDetails.contact,
        } as TeacherDetailsUpdateRequest;
      case 'student':
        return {
          firstName: this.userDetails.firstName,
          lastName: this.userDetails.lastName,
          dob: this.userDetails.dob,
          address: this.userDetails.address,
          contact: this.userDetails.contact,
        } as StudentDetailsUpdateRequest;
      default:
        return null;
    }
  }
}
