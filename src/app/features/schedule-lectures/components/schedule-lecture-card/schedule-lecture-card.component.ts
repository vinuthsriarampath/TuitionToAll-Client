import {Component, inject, input, output} from '@angular/core';
import {CardHeaderComponent, CardShellComponent} from "@shared/ui";
import {DatePipe} from "@angular/common";
import {
    ScheduleLecBadgeComponent
} from "@features/schedule-lectures/components/schedule-lec-badge/schedule-lec-badge.component";
import {ScheduleLectureResponse} from '@features/schedule-lectures/dtos/response/ScheduleLectureResponse';
import {ScheduleLectureService} from '@features/schedule-lectures/services/schedule-lecture/schedule-lecture.service';
import {
  ScheduleLecUpdateComponent
} from '@features/schedule-lectures/dialogs/schedule-lec-update/schedule-lec-update.component';
import {MatDialog} from '@angular/material/dialog';
import {AlertService} from '@core/services/alerts/alert.service';

@Component({
  selector: 'app-schedule-lecture-card',
    imports: [
        CardHeaderComponent,
        CardShellComponent,
        DatePipe,
        ScheduleLecBadgeComponent
    ],
  templateUrl: './schedule-lecture-card.component.html',
  styleUrl: './schedule-lecture-card.component.css'
})
export class ScheduleLectureCardComponent {
  scheduleLecture = input.required<ScheduleLectureResponse>();

  fetchScheduledLectures = output<void>();

  private readonly dialog:MatDialog = inject(MatDialog);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly scheduleLectureService:ScheduleLectureService = inject(ScheduleLectureService);

  protected formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;

    return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
  }

  protected canJoinLecture(scheduleLecture: ScheduleLectureResponse): boolean {
    return this.scheduleLectureService.canJoinLecture(scheduleLecture)
  }

  onJoin(scheduleLecture: ScheduleLectureResponse): void {
    if (this.canJoinLecture(scheduleLecture)){
      window.open(scheduleLecture.meetingUrl, '_blank');
    }else{
      this.alertService.triggerErrorAlert("Unable to join the meeting. Please ensure that the lecture is scheduled for today, has started but not yet ended, and that you are within the allowed attendance time (10 minutes with start time).");
    }
  }

  protected openScheduleLecUpdateDialog(scheduleLecture:ScheduleLectureResponse):void{
    const dialogRef = this.dialog.open(ScheduleLecUpdateComponent,{
      width:'650px',
      data: scheduleLecture
    });

    dialogRef.afterClosed().subscribe((res)=>{
      if(res) this.fetchScheduledLectures.emit();
    });
  }
}
