import {Component, inject, input, OnInit, signal} from '@angular/core';
import {environment} from '@env/environment.development';
import {AlertService} from '@core/services/alerts/alert.service';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {CourseFilter} from '../../dtos/request/course-filter';
import {CourseCardComponent} from '@features/course/components/course-card/course-card.component';
import {Course} from '@features/course/dtos/response/course';
import {CourseService} from '@features/course/services/course/course.service';
import {NoContentComponent} from '@shared/components/no-content/no-content.component';
import {combineLatest, distinctUntilChanged, switchMap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-courses',
  imports: [
    MatProgressSpinner,
    CourseCardComponent,
    NoContentComponent
  ],
  templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.css'
})
export class UserCoursesComponent implements OnInit{
  userId = input.required<number>();

  protected courses = signal<Course[]>([]);
  protected loading = signal<boolean>(false);

  private readonly courseService:CourseService = inject(CourseService);
  private readonly alertService:AlertService = inject(AlertService);
  protected readonly environment = environment;

  private readonly userId$ = toObservable(this.userId);

  ngOnInit(): void {

    combineLatest([this.userId$])
      .pipe(
        distinctUntilChanged(([prevId], [currId]) => prevId === currId),
        switchMap(([targetUserId]) => {
          this.loading.set(true);
          const filters = new CourseFilter()
          filters.status = 'published';
          return this.courseService.getAllCoursesByInstituteId(targetUserId,filters)
        })
      ).subscribe({
        next: (res) => {
          this.loading.set(false);
          if (res) this.courses.set(res);
        },
        error: (err) => {
          this.loading.set(false);
          this.alertService.triggerErrorAlert(err.error.message);
        }
      });
  }

  isNewCourse(createdAt:Date):boolean{
    return createdAt < new Date(new Date().setDate(new Date().getDate()-7));
  }
}
