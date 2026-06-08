import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavbarComponent} from '@shared/components/navbar/navbar.component';
import {NgIf, NgOptimizedImage, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {User} from '../../dtos/response/user';
import {UserService} from '../../services/user/user.service';
import {MatDialog} from '@angular/material/dialog';
import {UpdateProfileDialogComponent} from '../../components/update-profile-dialog/update-profile-dialog.component';
import {AlertService} from '@core/services/alerts/alert.service';
import {LucideAngularModule, Pen} from 'lucide-angular';
import {
  UpdateUserProfilePicDialogComponent
} from '../../components/update-user-profile-pic-dialog/update-user-profile-pic-dialog.component';
import {environment} from '@env/environment.development';
import {
  UpdateProfileBannerDialogComponent
} from '../../components/update-profile-banner-dialog/update-profile-banner-dialog.component';
import {MatTab, MatTabContent, MatTabGroup} from '@angular/material/tabs';
import {UserPostsComponent} from '../user-posts/user-posts.component';
import {UserCoursesComponent} from '../user-courses/user-courses.component';
import {InstituteJobsComponent} from '../institute-jobs/institute-jobs.component';

@Component({
  selector: 'app-user-profile',
  imports: [
    NavbarComponent,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgIf,
    LucideAngularModule,
    NgOptimizedImage,
    MatTabGroup,
    MatTab,
    MatTabContent,
    UserPostsComponent,
    UserCoursesComponent,
    InstituteJobsComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  readonly Pen = Pen;

  isSameUser: boolean = false;
  currentUser: User = new User();
  profileUser:User = new User();
  userRole: string = '';

  private readonly userService: UserService = inject(UserService);
  private readonly alertService:AlertService = inject(AlertService);

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private  readonly dialog:MatDialog) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const userSlug = params.get('userSlug') ?? '';
      this.loadUserData(userSlug);
    });

    this.userService.currentUser$.subscribe(user => {
      if(user) this.currentUser = structuredClone(user);
    })
  }

  private loadUserData(userSlug: string) {
    this.userService.findUserByUserSlug(userSlug).subscribe({
      next: (res) => {
        const user: User = res.data!;
        this.userRole = user.role?.role || '';

        this.profileUser = structuredClone(user);
        this.isSameUser = this.currentUser.email === user.email;
      },
      error() {
        window.location.replace('/app');
      }
    });
  }

  openProfilePicUpdateDialog() {
    let userDetails:User = this.profileUser;

    const dialogRef = this.dialog.open(UpdateUserProfilePicDialogComponent, {
      maxWidth: '80vh',
      width: '100%',
      panelClass: 'update-profile-dp-dialog',
      data: {
        userRole: structuredClone(this.userRole),
        details: structuredClone(userDetails)
      }
    });

    const alert:string = "Dp updated successfully";

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.alertService.triggerSuccessAlert(alert);
          this.profileUser = structuredClone(res);
          if(this.isSameUser) this.userService.setCurrentUser(this.profileUser);
          return;
        }
        this.alertService.triggerErrorAlert();
      }
    });
  }

  openProfileUpdateDialog() {
    let userDetails:User = this.profileUser;

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
          this.alertService.triggerSuccessAlert();
          this.profileUser = structuredClone(res);
          if(this.isSameUser) this.userService.setCurrentUser(this.profileUser);
          return;
        }
        this.alertService.triggerErrorAlert();
      }
    });
  }

  openProfileBannerUpdateDialog() {
    let userDetails:User = this.profileUser;

    const dialogRef = this.dialog.open(UpdateProfileBannerDialogComponent, {
      maxWidth: '100vh',
      width: '100%',
      panelClass: 'update-profile-banner-dialog',
      data: {
        userRole: structuredClone(this.userRole),
        details: structuredClone(userDetails)
      }
    });

    const alert:string = "Banner updated successfully!";

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.alertService.triggerSuccessAlert(alert);
          this.profileUser = structuredClone(res);
          if(this.isSameUser) this.userService.setCurrentUser(this.profileUser);
          return;
        }
        this.alertService.triggerErrorAlert();
      }
    });
  }
  tabLoadTimes: Date[] = [];

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

  protected readonly environment = environment;
}
