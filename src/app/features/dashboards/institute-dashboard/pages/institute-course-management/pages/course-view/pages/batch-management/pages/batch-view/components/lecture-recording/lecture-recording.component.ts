import {Component, inject, OnInit} from '@angular/core';
import {CardShellComponent} from '../../../../../../../../../../../../../shared/ui/card-shell/card-shell.component';
import {MatDialog} from '@angular/material/dialog';
import {LectureRecordUploadComponent} from '../lecture-record-upload/lecture-record-upload.component';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../../../../../../../../../../../../../core/services/alerts/alert.service';

@Component({
  selector: 'app-lecture-recording',
  imports: [
    CardShellComponent
  ],
  templateUrl: './lecture-recording.component.html',
  styleUrl: './lecture-recording.component.css'
})
export class LectureRecordingComponent implements  OnInit{

  private chapterId!:number;

  private readonly dialog:MatDialog = inject(MatDialog);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly activatedRoute:ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
      const chapterIdParam = params.get('chapterId') ?? '';
      if(chapterIdParam && Number.isNaN(chapterIdParam)){
        this.alertService.triggerErrorAlert("Invalid chapter id passed via route parameters");
        return;
      }else {
        this.chapterId = Number.parseInt(chapterIdParam);
      }
    })
  }

  protected openLectureRecordingUploadDialog():void{
    const dialogRef = this.dialog.open(LectureRecordUploadComponent,{
      width:'650px',
      data:this.chapterId
    });


  }
}
