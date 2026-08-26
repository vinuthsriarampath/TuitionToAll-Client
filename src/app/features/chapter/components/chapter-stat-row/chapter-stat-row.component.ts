import {Component, inject, OnInit} from '@angular/core';
import {StatCardComponent} from '@shared/ui';
import {ChapterStatCountResponse} from '@features/chapter/dtos/response/chapter-stats-response';
import {ChapterService} from '@features/chapter/services/chapter/chapter.service';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '@core/services/alerts/alert.service';
import {ChapterDetailedResponse} from '@features/chapter/dtos/response/ChapterDetailedResponse';

@Component({
  selector: 'app-chapter-stat-row',
  imports: [
    StatCardComponent
  ],
  templateUrl: './chapter-stat-row.component.html',
  styleUrl: './chapter-stat-row.component.css'
})
export class ChapterStatRowComponent implements OnInit{

  private chapterId!:number;
  protected chapter!:ChapterDetailedResponse;
  protected chapterStats!:ChapterStatCountResponse;
  protected loading:boolean = false;

  private readonly chapterService:ChapterService = inject(ChapterService);
  private readonly activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  private readonly alertService = inject(AlertService);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      const chapterIdParam = params.get('chapterId') ?? '' ;
      const chapterId = Number.parseInt(chapterIdParam);
      if (chapterId && !Number.isNaN(chapterId)){
        this.chapterId = chapterId;
        this.loadChapterStats();
      }
    })
  }

  private loadChapterStats():void{
    this.triggerLoading();
    this.chapterService.getChapterStats(this.chapterId).subscribe({
      next: (res)=>{
        if (res.data) {
          this.chapterStats = res.data;
          this.triggerLoading();
        }
      },
      error: err => {
        this.alertService.triggerErrorAlert(err.error.message);
        this.triggerLoading();
      }
    })
  }

  private triggerLoading():void{
    this.loading = !this.loading;
  }
}
