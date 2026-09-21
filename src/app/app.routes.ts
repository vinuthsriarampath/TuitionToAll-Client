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

import {Routes} from '@angular/router';
import {tokenGuard} from '@core/guards/token-guard/token.guard';
import {authGuard} from '@core/guards/auth-guard/auth.guard';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@shared/pages/landing-page/landing-page.component').then(m => m.LandingPageComponent),
    canActivate: [tokenGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('@features/auth/routes/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'app',
    canActivate: [tokenGuard,authGuard],
    loadChildren: () => import('@core/layouts/app/routes/main.routes').then(m => m.MAIN_ROUTES)
  },
  {
    path: 'ins',
    canActivate: [authGuard,tokenGuard],
    loadChildren: () => import('@features/institute/routes/institute.routes').then(m => m.INSTITUTE_ROUTES)
  },
  {
    path: "tch",
    canActivate: [authGuard,tokenGuard],
    loadChildren: () => import('@features/teacher/routes/teacher.routes').then(m => m.TEACHER_ROUTES)
  },
  {
    path: "stu",
    canActivate: [authGuard,tokenGuard],
    loadChildren: () => import('@features/student/routes/student.routes').then(m => m.STUDENT_ROUTES)
  },
  {
    path: 'profile/:userSlug',
    loadChildren: () => import('@features/profile/routes/profile.routes').then(m => m.PROFILE_ROUTES)
  },
  {
    path:'maintenance',
    title: 'Maintenance',
    loadComponent: () => import('@shared/pages/under-development-page/under-development-page.component').then(m => m.UnderDevelopmentPageComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    title: '404 | Not Found',
    loadComponent: () => import('@shared/pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  }
];
