import {Component, inject, OnInit} from '@angular/core';
import {CardShellComponent} from '@shared/ui';
import {MatDialog} from '@angular/material/dialog';
import {ScheduleLecCreateComponent} from '../../dialogs/schedule-lec-create/schedule-lec-create.component';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '@core/services/alerts/alert.service';
import {ChapterService} from '../../../chapter/services/chapter/chapter.service';
import {ScheduleLectureResponse} from '../../dtos/response/ScheduleLectureResponse';
import {LucideAngularModule, RefreshCcw} from 'lucide-angular';
import {
  ScheduleLectureCardComponent
} from '@features/schedule-lectures/components/schedule-lecture-card/schedule-lecture-card.component';
import {
  ScheduleLectureCardSkeletonComponent
} from '@features/schedule-lectures/components/schedule-lecture-card-skeleton/schedule-lecture-card-skeleton.component';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';

@Component({
  selector: 'app-scheduled-lectures',
  imports: [
    CardShellComponent,
    LucideAngularModule,
    ScheduleLectureCardComponent,
    ScheduleLectureCardSkeletonComponent,
    NoContentComponent,
  ],
  templateUrl: './scheduled-lectures.component.html',
  styleUrl: './scheduled-lectures.component.css'
})
export class ScheduledLecturesComponent implements OnInit{

  protected loading:boolean = false;

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

  protected readonly fetchAllScheduledLecturesByChapterId = ():void =>{
    this.triggerLoading();
    this.chapterService.getAllScheduleLecturesWithFilters(this.chapterId).subscribe({
      next:(res)=>{
        if(res.data) {
          this.scheduleLectures = res.data;
          this.triggerLoading();
        }
      },
      error:(err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
        this.triggerLoading();
      }
    })
  }

  onRefresh():void{
    this.fetchAllScheduledLecturesByChapterId();
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

  private triggerLoading():void{
    this.loading = !this.loading;
  }

  protected readonly RefreshCcw = RefreshCcw;
}
