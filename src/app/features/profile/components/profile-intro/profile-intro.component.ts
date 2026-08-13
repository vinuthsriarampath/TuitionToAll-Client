import {Component, inject, input, output} from '@angular/core';
import {CardShellComponent} from '@shared/ui';
import {Calendar, LucideAngularModule, MapPin, Phone} from 'lucide-angular';
import {PhonePipePipe} from '@shared/utils/pipes/phone-pipe/phone-pipe.pipe';
import {User} from '@features/user/dtos/responses/user';
import {AlertService} from '@core/services/alerts/alert.service';
import {MatDialog} from '@angular/material/dialog';
import {
  UpdateProfileDialogComponent
} from '@features/profile/dialogs/update-profile-dialog/update-profile-dialog.component';
import {UserHelper} from '@shared/utils/helpers/user-helper';

@Component({
  selector: 'app-profile-intro',
  imports: [
    CardShellComponent,
    LucideAngularModule,
    PhonePipePipe
  ],
  templateUrl: './profile-intro.component.html',
  styleUrl: './profile-intro.component.css'
})
export class ProfileIntroComponent {

  profileUser = input.required<User>();
  currentUser = input.required<User>();
  isSameUser = input.required<boolean>();
  loading = input<boolean>(false);

  profileUpdated = output<void>()

  private readonly alertService:AlertService = inject(AlertService);
  private readonly dialog:MatDialog = inject(MatDialog);

  openProfileUpdateDialog() {
    let userDetails:User = this.profileUser();

    const dialogRef = this.dialog.open(UpdateProfileDialogComponent, {
      maxWidth: '80vh',
      width: '100%',
      panelClass: 'update-profile-dialog',
      data: {
        userRole: structuredClone(this.profileUser().role?.role),
        details: structuredClone(userDetails)
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.alertService.triggerSuccessAlert();
          this.profileUpdated.emit(res);
        }
        this.alertService.triggerErrorAlert();
      }
    });
  }

  protected readonly MapPin = MapPin;
  protected readonly UserHelper = UserHelper;
  protected readonly Calendar = Calendar;
  protected readonly Phone = Phone;
}
