import {RedirectCommand, ResolveFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {TeacherService} from '@features/teacher/services/teacher/teacher.service';
import {catchError, map} from 'rxjs/operators';
import {AlertService} from '@core/services/alerts/alert.service';
import {of} from 'rxjs';
import {TeacherCourseViewResponse} from '@features/course/dtos/response/teacher-course-view-response';

export const teacherCourseResolver: ResolveFn<TeacherCourseViewResponse> = (route, state) => {

  const teacherService = inject(TeacherService);
  const alertService = inject(AlertService);
  const router = inject(Router);

  return teacherService.getTeacherDetailedCourse(Number(route.params['courseId'])).pipe(
    map((res)=> {
      if(res.data){
        return res.data;
      }
      alertService.triggerErrorAlert('Course not found');
      return new RedirectCommand(
        router.createUrlTree(['/tch/my-teachings'])
      );
    }),
    catchError(() => {
      alertService.triggerErrorAlert('Failed to load course');
      return of(new RedirectCommand(
        router.createUrlTree(['/tch/my-teachings'])
      ));
    })
  );
};
