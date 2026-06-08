import {Component, inject, input, output} from '@angular/core';
import {CardHeaderComponent} from '../../../../shared/ui/card-header/card-header.component';
import {LucideAngularModule, Trash2} from 'lucide-angular';
import {AnnouncementStatus} from '../../enums/AnnouncementStatus';
import {AnnouncementResponse} from '../../dtos/response/AnnouncementResponse';
import {AnnouncementService} from '../../services/announcements/announcement.service';
import {AlertService} from '../../../../core/services/alerts/alert.service';
import {MatDialog} from '@angular/material/dialog';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from '../../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-announcement-danger-zone-panel',
  imports: [
    CardHeaderComponent,
    LucideAngularModule
  ],
  templateUrl: './announcement-danger-zone-panel.component.html',
  styleUrl: './announcement-danger-zone-panel.component.css'
})
export class AnnouncementDangerZonePanelComponent {

  private readonly announcementService:AnnouncementService = inject(AnnouncementService);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly dialog:MatDialog = inject(MatDialog);

  announcement = input.required<AnnouncementResponse>();
  delete = output<AnnouncementResponse>();
  triggerLoading = output<void>()

  protected readonly Trash2 = Trash2;
  protected readonly AnnouncementStatus = AnnouncementStatus;

  deleteAnnouncement() {
    const confirmationData:ConfirmationDialogData = {
      title: 'Delete Announcement',
      message: 'This action cannot be undone. The announcement will be permanently deleted.',
      confirmText: 'Delete',
      confirmButtonClass: 'btn-mini-primary btn-danger',
      type: 'danger',
      icon: Trash2
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      disableClose: true,
      data: confirmationData
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if (confirmed) {
        this.triggerLoading.emit();
        this.announcementService.deleteAnnouncement(this.announcement().id).subscribe({
          next: (res) =>{
            if(res.data){
              this.triggerLoading.emit();
              this.delete.emit(res.data);
              this.alertService.triggerSuccessAlert('Announcement deleted successfully');
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
