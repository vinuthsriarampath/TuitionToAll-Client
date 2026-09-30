import {Component, inject, OnInit} from '@angular/core';
import {PageTitleComponent} from '@shared/components/page-title/page-title.component';
import {LoaderOverlayComponent} from '@shared/components/loader-overlay/loader-overlay.component';
import {BadgeComponent, CardHeaderComponent, CardShellComponent} from '@shared/ui';
import {CourseCard2Component} from '@features/course/components/course-card-2/course-card-2.component';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {RouterLink} from '@angular/router';
import {TeacherService} from '@features/teacher/services/teacher/teacher.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {TeachingResponse} from '@features/teacher/dtos/responses/teaching-response';

@Component({
  selector: 'app-teacher-courses',
  imports: [
    PageTitleComponent,
    LoaderOverlayComponent,
    CardHeaderComponent,
    CardShellComponent,
    CourseCard2Component,
    BadgeComponent,
    NoContentComponent,
    RouterLink
  ],
  templateUrl: './teacher-courses.component.html',
  styleUrl: './teacher-courses.component.css'
})
export class TeacherCoursesComponent implements  OnInit{

  protected loading:boolean = false;
  protected teachings: TeachingResponse[] = [];

  private readonly teacherService = inject(TeacherService);
  private readonly alertService = inject(AlertService);


  ngOnInit(): void {
    this.loadTeacherCourses();
  }

  private loadTeacherCourses(): void {
    this.loading = true;
    this.teacherService.getMyTeachingDetails().subscribe({
      next: res => {
        this.loading = false;
        if(res.data){
          this.teachings = res.data;
        }
      },
      error: err => {
        this.loading = false;
        this.alertService.triggerErrorAlert(err.error.message ?? 'Something went wrong while loading your courses. Please try again later.');
      }
    })
  }
}
