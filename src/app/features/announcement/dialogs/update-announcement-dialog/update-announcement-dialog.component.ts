import {Component, Inject, inject} from '@angular/core';
import {Eye, LucideAngularModule, Megaphone, SquarePen} from 'lucide-angular';
import {AnnouncementResponse} from '../../dtos/response/AnnouncementResponse';
import {AnnouncementStatus} from '../../../../core/enums/AnnouncementStatus';
import {AnnouncementVisibility} from '../../../../core/enums/AnnouncementVisibility';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AnnouncementService} from '../../services/announcements/announcement.service';
import {AlertService} from '../../../../core/services/alerts/alert.service';
import {FormsModule} from '@angular/forms';
import {DialogLayoutComponent} from '../../../../core/layouts/dialog-layout/dialog-layout.component';
import {AnnouncementCardComponent} from '../../components/announcement-card/announcement-card.component';
import {
  AnnouncementContentPanelComponent
} from '../../components/announcement-content-panel/announcement-content-panel.component';
import {
  AnnouncementVisibilityPanelComponent
} from '../../components/announcement-visibility-panel/announcement-visibility-panel.component';
import {
  AnnouncementPublicationPanelComponent
} from '../../components/announcement-publication-panel/announcement-publication-panel.component';
import {AnnouncementPinPanelComponent} from '../../components/announcement-pin-panel/announcement-pin-panel.component';
import {
  AnnouncementDangerZonePanelComponent
} from '../../components/announcement-danger-zone-panel/announcement-danger-zone-panel.component';

@Component({
  selector: 'app-update-announcement-dialog',
  imports: [
    LucideAngularModule,
    FormsModule,
    DialogLayoutComponent,
    AnnouncementCardComponent,
    AnnouncementContentPanelComponent,
    AnnouncementVisibilityPanelComponent,
    AnnouncementPublicationPanelComponent,
    AnnouncementPinPanelComponent,
    AnnouncementDangerZonePanelComponent
  ],
  templateUrl: './update-announcement-dialog.component.html',
  styleUrl: './update-announcement-dialog.component.css'
})
export class UpdateAnnouncementDialogComponent {

  protected loading: boolean = false;
  protected announcement!:AnnouncementResponse;

  private readonly dialogRef:MatDialogRef<UpdateAnnouncementDialogComponent> = inject(MatDialogRef<UpdateAnnouncementDialogComponent>);
  private readonly announcementService:AnnouncementService = inject(AnnouncementService);
  private readonly alertService:AlertService = inject(AlertService);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data:number) {
    this.fetchAnnouncementById(data);
  }

  fetchAnnouncementById(id:number){
    this.announcementService.getAnnouncementById(id).subscribe({
      next: (res)=>{
        if(res.data){
          this.announcement = res.data;
        }
      },
      error: (err)=>{
        this.alertService.triggerErrorAlert(err.error.message)
      }
    })
  }
  onCancel() {
      this.dialogRef.close();
  }

  protected openContentUpdate(updatedData: AnnouncementResponse) {
    if (updatedData) this.announcement = updatedData;
  }

  protected publishAnnouncement(updatedData: AnnouncementResponse) {
    if (updatedData) this.announcement = updatedData;
  }

  protected archiveAnnouncement(updatedData: AnnouncementResponse) {
    if (updatedData) this.announcement = updatedData;
  }

  protected pinAnnouncement(updatedData: AnnouncementResponse) {
    if (updatedData) this.announcement = updatedData;
  }

  protected unpinAnnouncement(updatedData: AnnouncementResponse) {
    if (updatedData) this.announcement = updatedData;
  }

  protected deleteAnnouncement(updatedData: AnnouncementResponse) {
    if (updatedData) this.announcement = updatedData;
  }

  protected openVisibilityUpdate(updatedData: AnnouncementResponse) {
    if (updatedData) this.announcement = updatedData;
  }

  protected triggerLoading():void{
    this.loading = !this.loading;
  }

  protected readonly AnnouncementStatus = AnnouncementStatus;
  protected readonly AnnouncementVisibility = AnnouncementVisibility;
  protected readonly Eye = Eye;
  protected readonly SquarePen = SquarePen;
  protected readonly Megaphone = Megaphone;
}
