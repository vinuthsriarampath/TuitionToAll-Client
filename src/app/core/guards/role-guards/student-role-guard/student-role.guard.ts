import {CanActivateChildFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {StudentService} from '@features/student/services/student/student.service';
import {AuthenticationService} from '@features/auth/services/auth/authentication.service';
import {catchError, map} from 'rxjs/operators';
import {AlertService} from '@core/services/alerts/alert.service';
import {of} from 'rxjs';

export const studentRoleGuard: CanActivateChildFn = (childRoute, state) => {

  const studentService = inject(StudentService);
  const authService = inject(AuthenticationService);
  const alertService = inject(AlertService);
  const router = inject(Router);

  return studentService.validateStudentRole().pipe(
    map(() => true),
    catchError(() => {
      alertService.triggerErrorAlert('Error validating student role');
      authService.logout();
      router.navigate(['auth/login']);
      return of(false);
    })
  );
};
