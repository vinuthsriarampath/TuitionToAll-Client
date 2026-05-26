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

@Component({
  selector: 'app-scheduled-lectures',
  imports: [
    CardShellComponent,
    CardHeaderComponent,
    DatePipe,
    ScheduleLecBadgeComponent,
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

  onJoin(meetingUrl: string): void {
    window.open(meetingUrl, '_blank');
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
}
