import {CanActivateFn, Router} from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const tokenGuard: CanActivateFn = (route, state) => {
  const token: string | null = localStorage.getItem('token');
  const authService: AuthenticationService = inject(AuthenticationService);
  const router: Router = inject(Router);

  if (token) {
    return authService.verifyToken().pipe(
      map(() => {
        if (state.url === '/'){
          router.navigate(['dashboard']);
          return false;
        }
        return true;
      }),
      catchError((err) => {
        router.navigate(['auth/login']);
        return of(false);
      })
    );
  }

  if (state.url !== '/') {
    router.navigate(['/']);
    return false;
  }
  return true;
};
