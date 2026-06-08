import {Component, inject, input, output} from '@angular/core';
import {CardShellComponent} from '../../../../shared/ui/card-shell/card-shell.component';
import {CardHeaderComponent} from '../../../../shared/ui/card-header/card-header.component';
import {AnnouncementResponse} from '../../dtos/response/AnnouncementResponse';
import {LucideAngularModule, Pin, PinOff} from 'lucide-angular';
import {AnnouncementStatus} from '../../enums/AnnouncementStatus';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {AnnouncementService} from '../../services/announcements/announcement.service';
import {AlertService} from '../../../../core/services/alerts/alert.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-announcement-pin-panel',
  imports: [
    CardShellComponent,
    CardHeaderComponent,
    LucideAngularModule
  ],
  templateUrl: './announcement-pin-panel.component.html',
  styleUrl: './announcement-pin-panel.component.css'
})
export class AnnouncementPinPanelComponent {

  announcement = input.required<AnnouncementResponse>();
  pin = output<AnnouncementResponse>();
  unpin = output<AnnouncementResponse>();
  triggerLoading = output<void>();

  private readonly dialog:MatDialog = inject(MatDialog);
  private readonly announcementService:AnnouncementService = inject(AnnouncementService);
  private readonly alertService:AlertService = inject(AlertService);


  protected readonly PinOff = PinOff;
  protected readonly Pin = Pin;
  protected readonly AnnouncementStatus = AnnouncementStatus;

  protected pinAnnouncement(){
    const confirmationData:ConfirmationDialogData = {
      title: 'Pin Announcement',
      message: 'Pinned announcements appear at the top.',
      confirmText: 'Pin',
      confirmButtonClass: 'btn-mini-primary',
      type: 'info',
      icon: Pin
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      disableClose: true,
      data: confirmationData
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        this.triggerLoading.emit();
        this.announcementService.pinAnnouncement(this.announcement().id).subscribe({
          next: (res) =>{
            if(res.data){
              this.triggerLoading.emit();
              this.pin.emit(res.data)
              this.alertService.triggerSuccessAlert('Announcement Pinned successfully');
            }
          },
          error: (err) => {
            this.triggerLoading.emit();
            this.alertService.triggerErrorAlert(err.error.message);
          }
        })
      }

    });
  }


  protected unpinAnnouncement(){
    const confirmationData:ConfirmationDialogData = {
      title: 'Unpin Announcement',
      message: 'This announcement will no longer stay highlighted.',
      confirmText: 'Unpin',
      confirmButtonClass: 'btn-mini-primary',
      type: 'warning',
      icon: PinOff
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      disableClose: true,
      data: confirmationData
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        this.triggerLoading.emit();
        this.announcementService.unpinAnnouncement(this.announcement().id).subscribe({
          next: (res) =>{
            if(res.data){
              this.triggerLoading.emit();
              this.unpin.emit(res.data);
              this.alertService.triggerSuccessAlert('Announcement Unpinned successfully');
            }
          },
          error: (err) => {
            this.triggerLoading.emit();
            this.alertService.triggerErrorAlert(err.error.message);
          }
        })
      }

    });
  }
}
