import {Component, inject, input, output} from '@angular/core';
import {AnnouncementResponse} from '../../dtos/response/AnnouncementResponse';
import {BadgeComponent, CardHeaderComponent, CardShellComponent, InfoRowComponent} from '@shared/ui';
import {Eye, LucideAngularModule} from 'lucide-angular';
import {AnnouncementVisibility} from '../../enums/AnnouncementVisibility';
import {
  UpdateAnnouncementVisibilityDialogComponent,
  UpdateAnnouncementVisibilityDialogData
} from '../../dialogs/update-announcement-visibility-dialog/update-announcement-visibility-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-announcement-visibility-panel',
  imports: [
    CardShellComponent,
    CardHeaderComponent,
    BadgeComponent,
    InfoRowComponent,
    LucideAngularModule
  ],
  templateUrl: './announcement-visibility-panel.component.html',
  styleUrl: './announcement-visibility-panel.component.css'
})
export class AnnouncementVisibilityPanelComponent {

  private readonly dialog:MatDialog = inject(MatDialog);


  announcement = input.required<AnnouncementResponse>();
  update = output<AnnouncementResponse>();
  protected readonly Eye = Eye;
  protected readonly AnnouncementVisibility = AnnouncementVisibility;

  openVisibilityUpdate() {
    const formData:UpdateAnnouncementVisibilityDialogData = {
      id : this.announcement().id,
      visibility : this.announcement().visibility,
      courseId: this.announcement().courseId,
      batchId: this.announcement().batchId

    }
    const dialogRef = this.dialog.open(UpdateAnnouncementVisibilityDialogComponent,{
      disableClose: true,
      width: '600px',
      data: formData
    })

    dialogRef.afterClosed().subscribe((updatedData:AnnouncementResponse) => {
      if (updatedData) this.update.emit(updatedData);
    })
  }
}
