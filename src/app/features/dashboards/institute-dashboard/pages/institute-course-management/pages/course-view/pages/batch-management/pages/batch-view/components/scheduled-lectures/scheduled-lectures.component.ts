import {Component, inject, OnInit} from '@angular/core';
import {CardShellComponent} from '../../../../../../../../../../../../../shared/ui/card-shell/card-shell.component';
import {MatDialog} from '@angular/material/dialog';
import {ScheduleLecCreateComponent} from '../schedule-lec-create/schedule-lec-create.component';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../../../../../../../../../../../../../core/services/alerts/alert.service';
import {CardHeaderComponent} from '../../../../../../../../../../../../../shared/ui/card-header/card-header.component';
import {ChapterService} from '../../../../../../../../../../../../../core/services/chapter/chapter.service';
import {
  ScheduleLectureResponse
} from '../../../../../../../../../../../../../core/dto/response-dto/schedule-lectures/ScheduleLectureResponse';
import {DatePipe} from '@angular/common';
import {ScheduleLecUpdateComponent} from '../schedule-lec-update/schedule-lec-update.component';
import {ScheduleLecBadgeComponent} from '../schedule-lec-badge/schedule-lec-badge.component';
import {getDate, getTime} from '../../../../../../../../../../../../../shared/utils/helpers/date-helper';
import {ScheduleLectureStatus} from '../../../../../../../../../../../../../core/enums/ScheduleLectureStatus';
import {LucideAngularModule, RefreshCcw} from 'lucide-angular';

@Component({
  selector: 'app-scheduled-lectures',
  imports: [
    CardShellComponent,
    CardHeaderComponent,
    DatePipe,
    ScheduleLecBadgeComponent,
    LucideAngularModule,
  ],
  templateUrl: './scheduled-lectures.component.html',
  styleUrl: './scheduled-lectures.component.css'
})
export class ScheduledLecturesComponent implements OnInit{

  protected scheduleLectures:ScheduleLectureResponse[] = [];

  private chapterId!:number;
  private readonly dialog:MatDialog = inject(MatDialog);
  private readonly activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  private readonly chapterService:ChapterService = inject(ChapterService);
  private readonly alertService:AlertService = inject(AlertService);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
      const chapterIdParam = params.get('chapterId') ?? '';

      const parsedChapterId: number = Number.parseInt(chapterIdParam);
      if (Number.isNaN(parsedChapterId)) {
        this.alertService.triggerErrorAlert('Invalid chapter id passed via route parameters');
        return;
      }
      this.chapterId = parsedChapterId;
      this.fetchAllScheduledLecturesByChapterId();
    })
  }

  private readonly fetchAllScheduledLecturesByChapterId = ():void =>{
    this.chapterService.getAllScheduleLecturesWithFilters(this.chapterId).subscribe({
      next:(res)=>{
        if(res.data) this.scheduleLectures = res.data;
      },
      error:(err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;

    return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
  }

  onRefresh():void{
    this.fetchAllScheduledLecturesByChapterId();
  }

  onJoin(scheduleLecture: ScheduleLectureResponse): void {
    if (this.canJoinLecture(scheduleLecture)){
      window.open(scheduleLecture.meetingUrl, '_blank');
    }else{
      this.alertService.triggerErrorAlert("Unable to join the meeting. Please ensure that the lecture is scheduled for today, has started but not yet ended, and that you are within the allowed attendance time (10 minutes with start time).");
    }
  }
  protected openScheduleLecCreateDialog():void{
    const dialogRef = this.dialog.open(ScheduleLecCreateComponent,{
      width:'650px',
      data: this.chapterId
    });

    dialogRef.afterClosed().subscribe((res)=>{
      if(res) this.fetchAllScheduledLecturesByChapterId();
    });
  }

  protected openScheduleLecUpdateDialog(scheduleLecture:ScheduleLectureResponse):void{
    const dialogRef = this.dialog.open(ScheduleLecUpdateComponent,{
      width:'650px',
      data: scheduleLecture
    });

    dialogRef.afterClosed().subscribe((res)=>{
      if(res) this.fetchAllScheduledLecturesByChapterId();
    });
  }

  protected canJoinLecture(scheduleLecture: ScheduleLectureResponse): boolean {

    const currentDate = this.getDate(0, 0);
    const currentTime = this.getTime(0, 0);

    const isToday:boolean = scheduleLecture.startDate === currentDate;

    const hasStarted:boolean = currentTime >= scheduleLecture.startTime;

    const notEnded:boolean = currentTime <= scheduleLecture.endTime;

    const validStatus:boolean = scheduleLecture.status === ScheduleLectureStatus.SCHEDULED || scheduleLecture.status === ScheduleLectureStatus.LIVE;

    let validAttendance:boolean;

    if (scheduleLecture.lateAttendance) {
      validAttendance = true;
    } else {
      const startDateTime = new Date(`${scheduleLecture.startDate}T${scheduleLecture.startTime}`);
      startDateTime.setMinutes(startDateTime.getMinutes() + 10);
      const now = new Date();
      validAttendance = now <= startDateTime;
    }
    return (isToday && hasStarted && notEnded && validStatus && validAttendance);
  }

  protected readonly getTime = getTime;
  protected readonly Date = Date;
  protected readonly getDate = getDate;
  protected readonly RefreshCcw = RefreshCcw;
}
