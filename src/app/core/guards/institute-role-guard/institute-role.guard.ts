import {CanActivateChildFn, Router} from '@angular/router';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {inject} from '@angular/core';

export const instituteRoleGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);

  if (!localStorage.getItem('token')) {
    router.navigate(['auth/login']);
    return false;
  }

  authService.validateInstitute().subscribe({
    next: () => {
      return true;
    },
    error: () => {
      router.navigate([router.lastSuccessfulNavigation?.finalUrl?.toString() || 'auth/login']);
      return false;
    }
  });
  return false;
};
