import {Component, inject} from '@angular/core';
import {NavbarComponent} from '../../../common/navbar/navbar.component';
import {isInstitute, isStudent, isTeacher} from '../../../core/helpers/user/user-type-guards';
import {Institute} from '../../../models/userModels/institute';
import {Teacher} from '../../../models/userModels/teacher';
import {Student} from '../../../models/userModels/student';
import {AuthenticationService} from '../../../services/auth/authentication.service';
import {User} from '../../../models/userModels/user';

@Component({
  selector: 'app-user-profile',
  imports: [
    NavbarComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  userRole:string = '';
  instituteDetails?:Institute;
  teacherDetails?:Teacher;
  studentDetails?:Student;
  authService: AuthenticationService = inject(AuthenticationService);

  displayName: string = '';
  email: string = '';


  constructor(authService:AuthenticationService) {
    this.authService.verifyToken().subscribe({
      next: (res) => {
        const user :User = res.data!;
        this.email = user.email ?? '';

        if (isInstitute(user)) {
          this.userRole = 'Institute';
          this.instituteDetails = user;
          this.displayName = user.instituteName ?? '';
        } else if (isStudent(user)) {
          this.userRole = 'Student';
          this.studentDetails = user;
          this.displayName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
        } else if (isTeacher(user)) {
          this.userRole = 'Teacher';
          this.teacherDetails = user;
          this.displayName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
        }
      },
      error(err){
        console.error(err);
        window.location.replace('/dashboard')
      }
    })
  }
}
