import {Component, inject, input, output} from '@angular/core';
import {BadgeComponent, CardShellComponent} from "@shared/ui";
import {DatePipe} from "@angular/common";
import {RouterLink} from '@angular/router';
import {LectureRecordResponse} from '@features/lecture-record/dtos/response/LectureRecordResponse';
import {
  LectureRecordUpdateComponent
} from '@features/lecture-record/dialogs/lecture-record-update/lecture-record-update.component';
import {MatDialog} from '@angular/material/dialog';
import {AlertService} from '@core/services/alerts/alert.service';

@Component({
  selector: 'app-recording-card',
  imports: [
    BadgeComponent,
    CardShellComponent,
    DatePipe,
    RouterLink
  ],
  templateUrl: './recording-card.component.html',
  styleUrl: './recording-card.component.css'
})
export class RecordingCardComponent {
  lectureRecord = input.required<LectureRecordResponse>();
  loading = input<boolean>(false);

  readonly fetchAllLectureRecords = output<void>();

  private readonly dialog:MatDialog = inject(MatDialog);
  private readonly alertService:AlertService = inject(AlertService);

  protected openLectureRecordDetailsUpdateDialog(lectureRecord:LectureRecordResponse):void{
    const dialogRef = this.dialog.open(LectureRecordUpdateComponent,{
      width:'650px',
      data:lectureRecord,
    });

    dialogRef.afterClosed().subscribe({
      next:(res)=>{
        this.fetchAllLectureRecords.emit();
      },
      error:(err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }
}
