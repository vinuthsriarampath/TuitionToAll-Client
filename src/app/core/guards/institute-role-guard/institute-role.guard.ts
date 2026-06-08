import {CanActivateChildFn, Router} from '@angular/router';
import {AuthenticationService} from '@features/auth/services/auth/authentication.service';
import {inject} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

export const instituteRoleGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);

  if (!localStorage.getItem('token')) {
    router.navigate(['auth/login']);
    return false;
  }

  return authService.validateInstitute().pipe(
    map(() => {
      return true;
    }),
    catchError(() => {
      router.navigate([router.lastSuccessfulNavigation?.finalUrl?.toString() || 'auth/login']);
      return of(false);
    })
  );
};

