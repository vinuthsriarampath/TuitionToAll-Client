import {CanActivateChildFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthenticationService} from '@features/auth/services/auth/authentication.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {TeacherService} from '@features/teacher/services/teacher/teacher.service';

export const teacherRoleGuard: CanActivateChildFn = (childRoute, state) => {
  const teacherService = inject(TeacherService);
  const authService = inject(AuthenticationService);
  const alertService = inject(AlertService);
  const router = inject(Router);

  return teacherService.validateTeacherRole().pipe(
    map(() => true),
    catchError(() => {
      alertService.triggerErrorAlert('Error validating teacher role');
      authService.logout();
      router.navigate(['auth/login']);
      return of(false);
    })
  );
};
