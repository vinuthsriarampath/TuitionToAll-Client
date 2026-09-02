import {Routes} from '@angular/router';

export const AUTH_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    title: 'Login',
    loadComponent: () => import('@features/auth/pages/login-page/login-page.component').then(m => m.LoginPageComponent)
  },
  {
    path: 'signup',
    title: 'Signup',
    loadComponent: () => import('@features/auth/pages/signup-page/signup-page.component').then(m => m.SignupPageComponent)
  },
  {
    path: 'reset-password/request',
    title: 'Reset Password Request',
    loadComponent: () => import('@features/auth/pages/reset-password-request-page/reset-password-request-page.component').then(m => m.ResetPasswordRequestPageComponent)
  },
  {
    path: 'reset',
    title: 'Reset Password',
    loadComponent: () => import('@features/auth/pages/password-reset-page/password-reset-page.component').then(m => m.PasswordResetPageComponent)
  },
];
