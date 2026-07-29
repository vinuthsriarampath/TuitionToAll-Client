import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AlertService} from '@core/services/alerts/alert.service';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {environment} from '@env/environment.development';
import {
  CourseAnnouncementListComponent
} from '../../components/course-announcement-list/course-announcement-list.component';
import {CourseService} from '@features/course/services/course/course.service';
import {Course} from '@features/course/dtos/response/course';
import {BadgeComponent, CardShellComponent} from '@shared/ui';
import {LucideAngularModule, Star} from 'lucide-angular';

@Component({
  selector: 'app-course-view',
  imports: [
    NgOptimizedImage,
    RouterLink,
    CurrencyPipe,
    CourseAnnouncementListComponent,
    BadgeComponent,
    CardShellComponent,
    LucideAngularModule
  ],
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.css'
})
export class CourseViewComponent implements OnInit {

  protected courseId!:number;
  protected course!:Course;

  private readonly alertService = inject(AlertService);
  private readonly courseService = inject(CourseService);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly window = globalThis.window;


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.courseId = Number.parseInt(params.get('courseId') ?? '');
      this.loadCourseDetails(this.courseId);
    })
  }

  loadCourseDetails(courseId: number) {
    this.courseService.getCourseById(courseId).subscribe({
      next: (res) => {
        if(res){
            this.course=res;
        }
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected readonly environment = environment;
  protected readonly Star = Star;
}
