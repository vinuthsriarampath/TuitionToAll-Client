import {Component, OnInit, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NavbarComponent} from '../../../shared/components/navbar/navbar.component';
import {NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {User} from '../../../core/models/user-models/user';
import {isInstitute, isStudent, isTeacher} from '../../../core/helpers/user/user-type-guards';
import {Institute} from '../../../core/models/user-models/sub-user-models/institute';
import {Teacher} from '../../../core/models/user-models/sub-user-models/teacher';
import {AuthenticationService} from '../../../core/services/auth/authentication.service';
import {UserService} from '../../../core/services/user/user.service';
import {Student} from '../../../core/models/user-models/sub-user-models/student';
import {MatDialog} from '@angular/material/dialog';
import {
  UpdateProfileDialogComponent
} from '../../../shared/models/update-profile-dialog/update-profile-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AlertService} from '../../../core/services/alerts/alert.service';

@Component({
  selector: 'app-user-profile',
  imports: [
    NavbarComponent,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgIf
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

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private  readonly dialog:MatDialog,
    private readonly snackBar:MatSnackBar,
    private  readonly alertService:AlertService) {
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
      error() {
        window.location.replace('/dashboard');
      }
    });
  }

  openProfileUpdateDialog() {
    let userDetails;
    if (this.userRole === 'student') {
      userDetails = this.studentDetails;
    } else if (this.userRole === 'teacher') {
      userDetails = this.teacherDetails;
    } else {
      userDetails = this.instituteDetails;
    }

    const dialogRef = this.dialog.open(UpdateProfileDialogComponent, {
      maxWidth: '80vh',
      width: '100%',
      panelClass: 'update-profile-dialog',
      data: {
        userRole: structuredClone(this.userRole),
        details: structuredClone(userDetails)
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          if (this.userRole === 'student') {
            this.alertService.triggerSuccessAlert();
            this.studentDetails = structuredClone(res);
            return;
          } else if (this.userRole === 'teacher') {
            this.alertService.triggerSuccessAlert();
            this.teacherDetails = structuredClone(res);
            return;
          } else if (this.userRole === 'institute') {
            this.alertService.triggerSuccessAlert();
            this.instituteDetails = structuredClone(res);
            return;
          }
          this.alertService.triggerErrorAlert();
          return;
        }
        this.alertService.triggerErrorAlert();
      }
    });
  }
}
