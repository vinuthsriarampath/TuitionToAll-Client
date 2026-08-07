import {Component, inject, OnInit} from '@angular/core';
import {BadgeComponent, CardShellComponent} from '@shared/ui';
import {MatDialog} from '@angular/material/dialog';
import {LectureRecordUploadComponent} from '../../dialogs/lecture-record-upload/lecture-record-upload.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AlertService} from '@core/services/alerts/alert.service';
import {LectureRecordResponse} from '../../dtos/response/LectureRecordResponse';
import {ChapterService} from '../../../chapter/services/chapter/chapter.service';
import {DatePipe} from '@angular/common';
import {LectureRecordUpdateComponent} from '../../dialogs/lecture-record-update/lecture-record-update.component';
import {RecordingCardComponent} from '@features/lecture-record/components/recording-card/recording-card.component';
import {
  RecordingCardSkeletonComponent
} from '@features/lecture-record/components/recording-card-skeleton/recording-card-skeleton.component';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';

@Component({
  selector: 'app-lecture-recording',
  imports: [
    CardShellComponent,
    DatePipe,
    RouterLink,
    BadgeComponent,
    RecordingCardComponent,
    RecordingCardSkeletonComponent,
    NoContentComponent
  ],
  templateUrl: './lecture-recording.component.html',
  styleUrl: './lecture-recording.component.css'
})
export class LectureRecordingComponent implements  OnInit{

  private chapterId!:number;
  protected lectureRecords:LectureRecordResponse[] =[];
  protected loading:boolean = false;

  private readonly dialog:MatDialog = inject(MatDialog);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  private readonly chapterService:ChapterService = inject(ChapterService);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
      const chapterIdParam = params.get('chapterId') ?? '';
      if(chapterIdParam && Number.isNaN(chapterIdParam)){
        this.alertService.triggerErrorAlert("Invalid chapter id passed via route parameters");
      }else {
        this.chapterId = Number.parseInt(chapterIdParam);
        this.fetchAllLectureRecords();
      }
    })
  }

  protected fetchAllLectureRecords = ():void => {
    this.triggerLoading();
    this.chapterService.getAllLectureRecordsByChapterId(this.chapterId).subscribe({
      next:(res)=>{
        if(res.data) {
          this.lectureRecords = res.data;
          this.triggerLoading();
        }
      },
      error:(err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
        this.triggerLoading();
      }
    })
  }

  protected openLectureRecordingUploadDialog():void{
    const dialogRef = this.dialog.open(LectureRecordUploadComponent,{
      width:'650px',
      data:this.chapterId,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe({
      next:(res)=>{
        if(res) this.lectureRecords.push(res);
      },
      error:(err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  private triggerLoading():void{
    this.loading=!this.loading;
  }
}
