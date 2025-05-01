/*
 * Copyright (c) 2025 vinuth sri arampath
 *
 * This code is the intellectual property of vinuth sri arampath and is protected under copyright law.
 * Unauthorized copying, modification, distribution, or use of this code, in whole or in part,
 * without prior written permission is strictly prohibited.
 *
 * Portions of this code may be generated with AI and modified by vinuth sri arampath
 * All rights reserved.
 */

import {CanActivateFn, Router} from '@angular/router';
import { AuthenticationService } from '../../services/auth/authentication.service';
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
