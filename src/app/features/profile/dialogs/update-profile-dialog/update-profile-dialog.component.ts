import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {Institute} from '../../dtos/response/institute';
import {Teacher} from '../../dtos/response/teacher';
import {Student} from '../../dtos/response/student';
import {NgClass, NgIf} from '@angular/common';
import {
  InstituteDetailsUpdateRequest
} from '../../dtos/request/user-update/sub-user-details-update-dto/InstituteDetailsUpdateRequest';
import {
  TeacherDetailsUpdateRequest
} from '../../dtos/request/user-update/sub-user-details-update-dto/TeacherDetailsUpdateRequest';
import {
  StudentDetailsUpdateRequest
} from '../../dtos/request/user-update/sub-user-details-update-dto/StudentDetailsUpdateRequest';
import {UserService} from '../../services/user/user.service';
import {User} from '../../dtos/response/user';
import {DialogLayoutComponent} from '@core/layouts';
import {SquarePen} from 'lucide-angular';

@Component({
  selector: 'app-update-profile-dialog',
  imports: [
    FormsModule,
    NgIf,
    DialogLayoutComponent,
    NgClass,
  ],
  templateUrl: './update-profile-dialog.component.html',
  styleUrl: './update-profile-dialog.component.css'
})
export class UpdateProfileDialogComponent {

  user!: User;
  isLoading: boolean = false;

  userService:UserService = inject(UserService);

  constructor(
    public dialogRef:MatDialogRef<UpdateProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{
      userRole: string;
      details: Institute|Teacher|Student;
    }) {
    this.user = {...data.details};
    console.log(this.user);
  }


  onConfirm(){
    this.dialogRef.close(this.user);
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
    console.log("3",this.data.userRole);
    switch (this.data.userRole) {
      case 'institute':
        return {
          instituteName: (this.user.details as Institute).instituteName,
          address: this.user.address,
          contact: this.user.contact,
        } as InstituteDetailsUpdateRequest;
      case 'teacher':
        return {
          firstName: (this.user.details as Teacher).firstName,
          lastName: (this.user.details as Teacher).lastName,
          dob: (this.user.details as Teacher).dob,
          address: this.user.address,
          contact: this.user.contact,
        } as TeacherDetailsUpdateRequest;
      case 'student':
        return {
          firstName: (this.user.details as Student).firstName,
          lastName: (this.user.details as Student).lastName,
          dob: (this.user.details as Student).dob,
          address: this.user.address,
          contact: this.user.contact,
        } as StudentDetailsUpdateRequest;
      default:
        return null;
    }
  }

  protected readonly SquarePen = SquarePen;
}
