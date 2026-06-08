import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArrowLeft, LucideAngularModule} from 'lucide-angular';
import {CardShellComponent} from '../../../../shared/ui/card-shell/card-shell.component';
import {CardHeaderComponent} from '../../../../shared/ui/card-header/card-header.component';
import {AlertService} from '../../../../core/services/alerts/alert.service';
import {ChapterService} from '../../../../core/services/chapter/chapter.service';
import {
  LectureRecordResponse
} from '../../dtos/response/LectureRecordResponse';
import {DatePipe} from '@angular/common';
import {environment} from '../../../../environment/environment.development';
import {
  LectureRecordService
} from '../../services/lecture-record/lecture-record.service';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-lecture-record-watch',
  imports: [
    LucideAngularModule,
    CardShellComponent,
    CardHeaderComponent,
    DatePipe
  ],
  templateUrl: './lecture-record-watch.component.html',
  styleUrl: './lecture-record-watch.component.css'
})
export class LectureRecordWatchComponent implements OnInit {

  protected fileName!: string;
  private chapterId!: number;
  protected lectureRecords: LectureRecordResponse[] = [];
  protected currentLectureRecord!: LectureRecordResponse;

  protected videoUrl!: string;

  protected readonly window = globalThis.window;
  protected readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly alertService: AlertService = inject(AlertService);
  private readonly chapterService: ChapterService = inject(ChapterService);
  private readonly lectureRecordService: LectureRecordService = inject(LectureRecordService);


  ngOnInit(): void {
    combineLatest([this.activatedRoute.queryParams, this.activatedRoute.paramMap]).subscribe(([queryParams, params]) => {
      const fileNameParam = queryParams['f'] ?? '';
      const chapterIdParam = params.get('chapterId') ?? '';

      if (!fileNameParam) {
        this.router.navigate(['..'], {
          relativeTo: this.activatedRoute
        });
        return;
      }

      const parsedChapterId: number = Number.parseInt(chapterIdParam);
      if (Number.isNaN(parsedChapterId)) {
        this.alertService.triggerErrorAlert('Invalid chapter id passed via route parameters');
        return;
      }

      this.fileName = fileNameParam;
      this.chapterId = parsedChapterId;

      this.fetchAllLectureRecords();
      this.loadVideo(this.fileName);

    });

  }

  private fetchAllLectureRecords(): void {
    this.chapterService.getAllLectureRecordsByChapterId(this.chapterId).subscribe({
      next: (res) => {
        if (res.data) {
          this.lectureRecords = res.data;
          this.currentLectureRecord = this.lectureRecords.find(record => record.url === this.fileName) ?? this.lectureRecords[0];
        }
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  private loadVideo(fileName: string): void {
    this.lectureRecordService.getStreamToken(fileName).subscribe({
      next: (res) => {
        if (res.data) {
          this.videoUrl = `${environment.LECTURE_RECORD_API}/stream/${this.fileName}?token=${res.data}`
        }
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
      }
    });

  }

  protected onVideoClick(lectureRecord: LectureRecordResponse) {
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        f: lectureRecord.url
      }
    });
  }

  protected readonly ArrowLeft = ArrowLeft;
  protected readonly environment = environment;
}
