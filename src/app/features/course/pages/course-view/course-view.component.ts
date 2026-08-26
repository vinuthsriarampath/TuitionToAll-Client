import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AlertService} from '@core/services/alerts/alert.service';
import {CurrencyPipe, DecimalPipe, NgOptimizedImage} from '@angular/common';
import {environment} from '@env/environment.development';
import {
  CourseAnnouncementListComponent
} from '@features/announcement/components/course-announcement-list/course-announcement-list.component';
import {CourseService} from '@features/course/services/course/course.service';
import {Course} from '@features/course/dtos/response/course';
import {BadgeComponent, CardShellComponent} from '@shared/ui';
import {LucideAngularModule, Star} from 'lucide-angular';
import {CourseTreeComponent} from '@features/course/components/course-tree/course-tree.component';
import {CourseStatsResponse} from '@features/course/dtos/response/course-stats-response';
import {PageLayoutComponent} from '@core/layouts';

@Component({
  selector: 'app-course-view',
  imports: [
    NgOptimizedImage,
    RouterLink,
    CurrencyPipe,
    CourseAnnouncementListComponent,
    BadgeComponent,
    CardShellComponent,
    LucideAngularModule,
    CourseTreeComponent,
    DecimalPipe,
    PageLayoutComponent
  ],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export class CourseViewComponent implements OnInit {

  protected courseId!:number;
  protected course!:Course;
  protected courseStats!:CourseStatsResponse;
  protected loading:boolean = false;
  protected statsLoading:boolean = false;

  private readonly alertService = inject(AlertService);
  private readonly courseService = inject(CourseService);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly window = globalThis.window;


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.courseId = Number.parseInt(params.get('courseId') ?? '');
      this.loadCourseDetails(this.courseId);
      this.loadCourseStats();
    })
  }

  loadCourseDetails(courseId: number) {
    this.triggerLoading();
    this.courseService.getCourseById(courseId).subscribe({
      next: (res) => {
        if(res){
            this.course=res;
        }
        this.triggerLoading();
      },
      error: (err) => {
        this.triggerLoading();
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  loadCourseStats():void{
    this.triggerStatsLoading();
    this.courseService.getCourseStats(this.courseId).subscribe({
      next: (res) => {
        if(res.data){
          this.courseStats = res.data;
        }
        this.triggerStatsLoading();
      },
      error: (err) => {
        this.triggerStatsLoading();
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  private triggerLoading():void{
    this.loading = !this.loading;
  }

  private triggerStatsLoading():void{
    this.statsLoading = !this.statsLoading;
  }

  protected readonly environment = environment;
  protected readonly Star = Star;
}
