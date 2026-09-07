import {RedirectCommand, ResolveFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {StudentService} from '@features/student/services/student/student.service';
import {StudentCourseViewResponse} from '@features/course/dtos/response/student-course-view-response';
import {catchError, map} from 'rxjs/operators';
import {AlertService} from '@core/services/alerts/alert.service';
import {of} from 'rxjs';

export const studentCourseResolver: ResolveFn<StudentCourseViewResponse> = (route, state) => {
  const studentService = inject(StudentService);
  const alertService = inject(AlertService);
  const router = inject(Router);
  return studentService.getStudentCourse(Number(route.params['courseId']), Number(route.params['batchId'])).pipe(
    map((res) => {
      if (res.data) {
        return res.data;
      }
      alertService.triggerErrorAlert('Course not found');
      return new RedirectCommand(
        router.createUrlTree(['/stu/my-learnings'])
      );
    }),
    catchError(() => {
      alertService.triggerErrorAlert('Failed to load course');
      return of(new RedirectCommand(
        router.createUrlTree(['/stu/my-learnings'])
      ));
    })
  );
};
