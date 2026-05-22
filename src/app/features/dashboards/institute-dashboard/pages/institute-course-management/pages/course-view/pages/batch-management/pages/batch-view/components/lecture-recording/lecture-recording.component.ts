import {Component, inject, OnInit} from '@angular/core';
import {CardShellComponent} from '../../../../../../../../../../../../../shared/ui/card-shell/card-shell.component';
import {MatDialog} from '@angular/material/dialog';
import {LectureRecordUploadComponent} from '../lecture-record-upload/lecture-record-upload.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AlertService} from '../../../../../../../../../../../../../core/services/alerts/alert.service';
import {
  LectureRecordResponse
} from '../../../../../../../../../../../../../core/dto/response-dto/lecture-record/LectureRecordResponse';
import {ChapterService} from '../../../../../../../../../../../../../core/services/chapter/chapter.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-lecture-recording',
  imports: [
    CardShellComponent,
    DatePipe,
    RouterLink
  ],
  templateUrl: './lecture-recording.component.html',
  styleUrl: './lecture-recording.component.css'
})
export class LectureRecordingComponent implements  OnInit{

  private chapterId!:number;
  protected lectureRecords:LectureRecordResponse[] =[];

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

  private fetchAllLectureRecords():void{
    this.chapterService.getAllLectureRecordsByChapterId(this.chapterId).subscribe({
      next:(res)=>{
        if(res.data) this.lectureRecords = res.data
      },
      error:(err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected openLectureRecordingUploadDialog():void{
    const dialogRef = this.dialog.open(LectureRecordUploadComponent,{
      width:'650px',
      data:this.chapterId
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
}
