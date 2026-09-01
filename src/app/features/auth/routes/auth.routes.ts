import {Routes} from '@angular/router';
import {LoginPageComponent} from '@features/auth/pages/login-page/login-page.component';
import {SignupPageComponent} from '@features/auth/pages/signup-page/signup-page.component';
import {
  ResetPasswordRequestPageComponent
} from '@features/auth/pages/reset-password-request-page/reset-password-request-page.component';
import {PasswordResetPageComponent} from '@features/auth/pages/password-reset-page/password-reset-page.component';

export const AUTH_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'signup',
    component: SignupPageComponent
  },
  {
    path: 'reset-password/request',
    component: ResetPasswordRequestPageComponent
  },
  {
    path: 'reset',
    component: PasswordResetPageComponent
  },
];
