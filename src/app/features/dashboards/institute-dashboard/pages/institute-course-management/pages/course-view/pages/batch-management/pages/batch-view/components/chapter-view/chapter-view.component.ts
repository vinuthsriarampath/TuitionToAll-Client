import {Component, inject, OnInit} from '@angular/core';
import {
  ChapterDetailedResponse
} from '../../../../../../../../../../../../../core/dto/response-dto/chapter/ChapterDetailedResponse';
import {ChapterService} from '../../../../../../../../../../../../../core/services/chapter/chapter.service';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../../../../../../../../../../../../../core/services/alerts/alert.service';
import {ChapterBadgeComponent} from '../chapter-badge/chapter-badge.component';
import {DatePipe} from '@angular/common';
import {ArrowLeft, LucideAngularModule} from 'lucide-angular';
import {ChapterHeaderComponent} from '../chapter-header/chapter-header.component';
import {CardShellComponent} from '../../../../../../../../../../../../../shared/ui/card-shell/card-shell.component';
import {ChapterStatRowComponent} from '../chapter-stat-row/chapter-stat-row.component';
import {ChapterOverviewComponent} from '../chapter-overview/chapter-overview.component';
import {LectureRecordingComponent} from '../lecture-recording/lecture-recording.component';
import {ResourcesComponent} from '../resources/resources.component';
import {ScheduledLecturesComponent} from '../scheduled-lectures/scheduled-lectures.component';

@Component({
  selector: 'app-chapter-view',
  imports: [
    ChapterBadgeComponent,
    DatePipe,
    LucideAngularModule,
    ChapterHeaderComponent,
    CardShellComponent,
    ChapterStatRowComponent,
    ChapterOverviewComponent,
    LectureRecordingComponent,
    ResourcesComponent,
    ScheduledLecturesComponent
  ],
  templateUrl: './chapter-view.component.html',
  styleUrl: './chapter-view.component.css'
})
export class ChapterViewComponent implements OnInit{

    private chapterId!:number;
    protected chapter!:ChapterDetailedResponse;
    protected readonly window = globalThis.window;

    private readonly chapterService:ChapterService = inject(ChapterService);
    private readonly activatedRoute:ActivatedRoute = inject(ActivatedRoute);
    private readonly alertService = inject(AlertService);

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params =>{
          const chapterIdParam = params.get('chapterId') ?? '' ;
          const chapterId = Number.parseInt(chapterIdParam);
          if (chapterId && !Number.isNaN(chapterId)){
            this.chapterId = chapterId;
            this.loadChapterDetails();
          }
        })
    }

    private loadChapterDetails():void{
      this.chapterService.getDetailedChapterById(this.chapterId).subscribe({
        next: (res)=>{
          if(res.data) this.chapter = res.data;
        },
        error: (err)=>{
          this.alertService.triggerErrorAlert(err.error.message);
        }
      })
    }

  protected readonly ArrowLeft = ArrowLeft;
}
