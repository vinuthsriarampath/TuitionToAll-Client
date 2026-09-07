import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StudentCourseViewResponse} from '@features/course/dtos/response/student-course-view-response';
import {PageLayoutComponent} from '@core/layouts';
import {CourseViewShellComponent} from '@features/course/components/course-view-shell/course-view-shell.component';
import {StudentCourseResponse} from '@features/course/dtos/response/student-course-response';
import {StudentBatchResponse} from '@features/batch/dtos/response/student-batch-response';
import {StudentModuleResponse} from '@features/module/dtos/response/student-module-response';
import {CourseHeroComponent} from '@features/course/components/course-hero/course-hero.component';
import {CourseDescriptionComponent} from '@features/course/components/course-description/course-description.component';
import {
  CourseAnnouncementListComponent
} from '@features/announcement/components/course-announcement-list/course-announcement-list.component';

@Component({
  selector: 'app-student-course-view',
  imports: [
    PageLayoutComponent,
    CourseViewShellComponent,
    CourseHeroComponent,
    CourseDescriptionComponent,
    CourseAnnouncementListComponent
  ],
  templateUrl: './student-course-view.component.html',
  styleUrl: './student-course-view.component.css'
})
export class StudentCourseViewComponent implements OnInit{

  protected readonly window = globalThis.window;
  protected loading: boolean = false;
  protected course !:StudentCourseResponse;
  protected batch !: StudentBatchResponse;
  protected modules!:StudentModuleResponse;
  protected courseViewResponse!:StudentCourseViewResponse;

  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.data.subscribe(({ course}) => {
      if (course) {
        this.courseViewResponse = course;
        this.course = course.course;
        this.batch = course.batch;
        this.modules = course.modules;
      }
      this.loading = false;
    })
  }
}
