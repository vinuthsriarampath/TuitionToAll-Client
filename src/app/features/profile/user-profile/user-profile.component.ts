import {Component, inject} from '@angular/core';
import {NavbarComponent} from '../../../common/navbar/navbar.component';
import {isInstitute, isStudent, isTeacher} from '../../../core/helpers/user/user-type-guards';
import {Institute} from '../../../models/userModels/institute';
import {Teacher} from '../../../models/userModels/teacher';
import {Student} from '../../../models/userModels/student';
import {AuthenticationService} from '../../../services/auth/authentication.service';
import {User} from '../../../models/userModels/user';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [
    NavbarComponent,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  instituteDetails?:Institute;
  teacherDetails?:Teacher;
  studentDetails?:Student;

  userRole:string = '';

  authService: AuthenticationService = inject(AuthenticationService);

  constructor(authService:AuthenticationService) {
    this.authService.verifyToken().subscribe({
      next: (res) => {
        const user :User = res.data!;

        if (isInstitute(user)) {
          this.userRole = 'institute';
          this.instituteDetails = user;
        } else if (isStudent(user)) {
          this.userRole = 'student';
          this.studentDetails = user;
        } else if (isTeacher(user)) {
          this.userRole = 'teacher';
          this.teacherDetails = user;
        }
      },
      error(err){
        console.error(err);
        window.location.replace('/dashboard')
      }
    })
  }
}
