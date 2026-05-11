import {Component, inject, input, output} from '@angular/core';
import {InfoRowComponent} from '../../../../../../../shared/ui/info-row/info-row.component';
import {AnnouncementResponse} from '../../../../../../../core/dto/response-dto/AnnouncementResponse';
import {CardHeaderComponent} from '../../../../../../../shared/ui/card-header/card-header.component';
import {CardShellComponent} from '../../../../../../../shared/ui/card-shell/card-shell.component';
import {LucideAngularModule, SquarePen} from 'lucide-angular';
import {
  UpdateAnnouncementContentDialogComponent,
  UpdateAnnouncementContentDialogData
} from '../../model/update-announcement-dialog/models/update-announcement-content-dialog/update-announcement-content-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-announcement-content-panel',
  imports: [
    InfoRowComponent,
    CardHeaderComponent,
    CardShellComponent,
    LucideAngularModule
  ],
  templateUrl: './announcement-content-panel.component.html',
  styleUrl: './announcement-content-panel.component.css'
})
export class AnnouncementContentPanelComponent {

  private readonly dialog:MatDialog = inject(MatDialog);

  announcement = input.required<AnnouncementResponse>();
  update = output<AnnouncementResponse>()
  protected readonly SquarePen = SquarePen;

  protected formatDate(date:string):string{
    const parsedDate = new Date(date);

    if(Number.isNaN(parsedDate.getTime())){
      return date;
    }

    return new Intl.DateTimeFormat('en-US',{
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }).format(parsedDate);
  }

  openContentUpdate() {
    const formData:UpdateAnnouncementContentDialogData = {
      id: this.announcement().id,
      title: this.announcement().title,
      description: this.announcement().description,
      expireAt: this.announcement().expireAt
    }

    const dialogRef = this.dialog.open(UpdateAnnouncementContentDialogComponent, {
      disableClose: true,
      width: '600px',
      data: formData
    });

    dialogRef.afterClosed().subscribe((updatedData: AnnouncementResponse) => {
      if (updatedData) this.update.emit(updatedData);
    });
  }

}
