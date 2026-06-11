import {Component, inject, OnInit} from '@angular/core';
import {ChapterDetailedResponse} from '../../dtos/response/ChapterDetailedResponse';
import {ChapterService} from '../../services/chapter/chapter.service';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '@core/services/alerts/alert.service';
import {ArrowLeft, LucideAngularModule} from 'lucide-angular';
import {ChapterHeaderComponent} from '../../components/chapter-header/chapter-header.component';
import {CardShellComponent} from '@shared/ui';
import {ChapterStatRowComponent} from '../../components/chapter-stat-row/chapter-stat-row.component';
import {ChapterOverviewComponent} from '../../components/chapter-overview/chapter-overview.component';
import {LectureRecordingComponent} from '../../../lecture-record/pages/lecture-recording/lecture-recording.component';
import {ResourcesComponent} from '../../../resources/pages/resources/resources.component';
import {
  ScheduledLecturesComponent
} from '../../../schedule-lectures/pages/scheduled-lectures/scheduled-lectures.component';
import {AssignmentListComponent} from '@features/assignments/pages/assignment-list/assignment-list.component';

@Component({
  selector: 'app-chapter-view',
  imports: [
    LucideAngularModule,
    ChapterHeaderComponent,
    CardShellComponent,
    ChapterStatRowComponent,
    ChapterOverviewComponent,
    LectureRecordingComponent,
    ResourcesComponent,
    ScheduledLecturesComponent,
    AssignmentListComponent
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
