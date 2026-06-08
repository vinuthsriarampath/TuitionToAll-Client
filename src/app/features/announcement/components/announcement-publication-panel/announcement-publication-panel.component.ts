import {Component, inject, input, output} from '@angular/core';
import {AnnouncementResponse} from '../../dtos/response/AnnouncementResponse';
import {CardShellComponent} from '../../../../shared/ui/card-shell/card-shell.component';
import {CardHeaderComponent} from '../../../../shared/ui/card-header/card-header.component';
import {Archive, LucideAngularModule, Send} from 'lucide-angular';
import {AnnouncementStatus} from '../../enums/AnnouncementStatus';
import {MatDialog} from '@angular/material/dialog';
import {AlertService} from '../../../../core/services/alerts/alert.service';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import {AnnouncementService} from '../../services/announcements/announcement.service';

@Component({
  selector: 'app-announcement-publication-panel',
  imports: [
    CardShellComponent,
    CardHeaderComponent,
    LucideAngularModule
  ],
  templateUrl: './announcement-publication-panel.component.html',
  styleUrl: './announcement-publication-panel.component.css'
})
export class AnnouncementPublicationPanelComponent {

  private readonly dialog:MatDialog = inject(MatDialog);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly announcementService:AnnouncementService = inject(AnnouncementService);

  announcement = input.required<AnnouncementResponse>();
  archive = output<AnnouncementResponse>();
  publish = output<AnnouncementResponse>();
  triggerLoading = output<void>();

  protected readonly Send = Send;
  protected readonly AnnouncementStatus = AnnouncementStatus;
  protected readonly Archive = Archive;

  archiveAnnouncement() {
    const confirmationData:ConfirmationDialogData = {
      title: 'Archive Announcement',
      message: 'Archived announcements will no longer be editable.',
      confirmText: 'Archive',
      confirmButtonClass: 'btn-mini-secondary',
      type: 'warning',
      icon: Archive
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      disableClose: true,
      data: confirmationData
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        this.triggerLoading.emit();
        this.announcementService.archiveAnnouncement(this.announcement().id).subscribe({
          next: (res) =>{
            if(res.data){
              this.triggerLoading.emit();
              this.archive.emit(res.data)
              this.alertService.triggerSuccessAlert('Announcement Archived successfully');
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


  publishAnnouncement() {
    const confirmationData:ConfirmationDialogData = {
      title: 'Publish Announcement',
      message: 'This announcement will become visible to users.',
      confirmText: 'Publish',
      confirmButtonClass: 'btn-mini-primary btn-success',
      type: 'success',
      icon: Send
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      disableClose: true,
      data: confirmationData
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        this.triggerLoading.emit();
        this.announcementService.publishAnnouncement(this.announcement().id).subscribe({
          next: (res) =>{
            if(res.data){
              this.triggerLoading.emit();
              this.publish.emit(res.data);
              this.alertService.triggerSuccessAlert('Announcement Published successfully');
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
