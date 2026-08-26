import {Component, inject, input, output} from '@angular/core';
import {User} from '@features/user/dtos/responses/user';
import {MatDialog} from '@angular/material/dialog';
import {
  UpdateUserProfilePicDialogComponent
} from '@features/profile/dialogs/update-user-profile-pic-dialog/update-user-profile-pic-dialog.component';
import {AlertService} from '@core/services/alerts/alert.service';
import {
  UpdateProfileBannerDialogComponent
} from '@features/profile/dialogs/update-profile-banner-dialog/update-profile-banner-dialog.component';
import {LucideAngularModule, Pen} from 'lucide-angular';
import {NgOptimizedImage} from '@angular/common';
import {UserHelper} from '@shared/utils/helpers/user-helper';

@Component({
  selector: 'app-profile-cover',
  imports: [
    LucideAngularModule,
    NgOptimizedImage
  ],
  templateUrl: './profile-cover.component.html',
  styleUrl: './profile-cover.component.css'
})
export class ProfileCoverComponent {
  profileUser = input.required<User>();
  currentUser = input.required<User>();
  isSameUser = input.required<boolean>();
  loading = input<boolean>(false);

  profileUpdated = output<void>()

  private readonly alertService:AlertService = inject(AlertService);
  private readonly dialog:MatDialog = inject(MatDialog);

  openProfilePicUpdateDialog() {
    let userDetails:User = this.profileUser();

    const dialogRef = this.dialog.open(UpdateUserProfilePicDialogComponent, {
      maxWidth: '80vh',
      width: '100%',
      panelClass: 'update-profile-dp-dialog',
      data: {
        userRole: structuredClone(this.profileUser().role?.role),
        details: structuredClone(userDetails)
      }
    });

    const alert:string = "Dp updated successfully";

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.alertService.triggerSuccessAlert(alert);
          this.profileUpdated.emit(res);
        }
        this.alertService.triggerErrorAlert();
      }
    });
  }

  openProfileBannerUpdateDialog() {
    let userDetails:User = this.profileUser();

    const dialogRef = this.dialog.open(UpdateProfileBannerDialogComponent, {
      maxWidth: '100vh',
      width: '100%',
      panelClass: 'update-profile-banner-dialog',
      data: {
        userRole: structuredClone(this.profileUser().role?.role),
        details: structuredClone(userDetails)
      }
    });

    const alert:string = "Banner updated successfully!";

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.alertService.triggerSuccessAlert(alert);
          this.profileUpdated.emit(res);
        }
        this.alertService.triggerErrorAlert();
      }
    });
  }

  protected readonly UserHelper = UserHelper;
  protected readonly Pen = Pen;
}
