import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {Institute} from '../../../institute/dtos/response/institute';
import {Teacher} from '../../../teacher/dtos/responses/teacher';
import {Student} from '../../../student/dtos/responses/student';
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
import {InstituteService} from '@features/institute/services/institute/institute.service';
import {StudentService} from '@features/student/services/student/student.service';
import {TeacherService} from '@features/teacher/services/teacher/teacher.service';

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

  private readonly userService:UserService = inject(UserService);
  private readonly instituteService:InstituteService = inject(InstituteService);
  private readonly teacherService:TeacherService = inject(TeacherService);
  private readonly studentService:StudentService = inject(StudentService);

  constructor(
    public dialogRef:MatDialogRef<UpdateProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{
      userRole: string;
      details: Institute|Teacher|Student;
    }) {
    this.user = {...data.details};
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
        this.instituteService.updateInstituteDetails(updateRequest).subscribe({
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
        this.teacherService.updateTeacherDetails(updateRequest).subscribe({
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
        this.studentService.updateStudentDetails(updateRequest).subscribe({
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
