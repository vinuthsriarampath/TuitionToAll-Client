import {Component, inject, input, output} from '@angular/core';
import {CardShellComponent} from '../../../../shared/ui/card-shell/card-shell.component';
import {CardHeaderComponent} from '../../../../shared/ui/card-header/card-header.component';
import {AnnouncementResponse} from '../../dtos/response/AnnouncementResponse';
import {BadgeComponent} from '../../../../shared/ui/badge/badge.component';
import {InfoRowComponent} from '../../../../shared/ui/info-row/info-row.component';
import {Eye, LucideAngularModule} from 'lucide-angular';
import {AnnouncementVisibility} from '../../../../core/enums/AnnouncementVisibility';
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
