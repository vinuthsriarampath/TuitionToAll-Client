import {Component, OnInit, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NavbarComponent} from '../../../common/navbar/navbar.component';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {User} from '../../../models/userModels/user';
import {isInstitute, isStudent, isTeacher} from '../../../core/helpers/user/user-type-guards';
import {Institute} from '../../../models/userModels/institute';
import {Teacher} from '../../../models/userModels/teacher';
import {AuthenticationService} from '../../../services/auth/authentication.service';
import {UserService} from '../../../core/services/user/user.service';
import {Student} from '../../../models/userModels/student';

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
export class UserProfileComponent implements OnInit {
  isSameUser: boolean = false;
  currentUser: any;
  instituteDetails?: Institute;
  teacherDetails?: Teacher;
  studentDetails?: Student;
  userRole: string = '';


  authService: AuthenticationService = inject(AuthenticationService);
  userService: UserService = inject(UserService);

  constructor(private readonly activatedRoute: ActivatedRoute) {
    this.authService.verifyToken().subscribe({
      next: (res) => {
        this.currentUser = res.data!;
      },
      error(err) {
        console.error(err);
        window.location.replace('/dashboard');
      }
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const userSlug = params.get('userSlug') ?? '';
      this.loadUserData(userSlug);
    });
  }

  private loadUserData(userSlug: string) {
    this.userService.findUserByUserSlug(userSlug).subscribe({
      next: (res) => {
        const user: User = res.data!;

        this.instituteDetails = undefined;
        this.teacherDetails = undefined;
        this.studentDetails = undefined;
        this.userRole = '';

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
        this.isSameUser = this.currentUser.email === user.email;
      },
      error(err) {
        window.location.replace('/dashboard');
      }
    });
  }
}
