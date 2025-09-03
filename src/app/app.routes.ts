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

import { Routes } from '@angular/router';
import {LandingPageComponent} from './shared/pages/landing-page/landing-page.component';
import { LoginPageComponent } from './features/auth/login-page/login-page.component';
import {tokenGuard} from './core/guards/token-guard/token.guard';
import {SignupPageComponent} from './features/auth/signup-page/signup-page.component';
import {UnderDevelopmentPageComponent} from './shared/pages/under-development-page/under-development-page.component';
import {authGuard} from './core/guards/auth-guard/auth.guard';
import {UserProfileComponent} from './features/profile/user-profile/user-profile.component';
import {PageNotFoundComponent} from './shared/pages/page-not-found/page-not-found.component';
import {
  ResetPasswordRequestPageComponent
} from './features/auth/reset-password-request-page/reset-password-request-page.component';
import {PasswordResetPageComponent} from './features/auth/password-reset-page/password-reset-page.component';
import {AppComponent} from './features/app/app.component';
import {FeedComponent} from './features/feed/feed.component';
import {InstituteDashboardComponent} from './features/dashboards/institute-dashboard/institute-dashboard.component';
import {instituteRoleGuard} from './core/guards/institute-role-guard/institute-role.guard';
import {DashboardComponent} from './features/dashboards/institute-dashboard/pages/dashboard/dashboard.component';
import {
  InstituteCourseManagementComponent
} from './features/dashboards/institute-dashboard/pages/institute-course-management/institute-course-management.component';
import {
  CourseCreateComponent
} from './features/dashboards/institute-dashboard/pages/institute-course-management/pages/course-create/course-create.component';


export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [tokenGuard]
  },
  {
    path: 'auth/login',
    component: LoginPageComponent
  },
  {
    path: 'auth/signup',
    component: SignupPageComponent
  },
  {
    path: 'auth/reset-password/request',
    component: ResetPasswordRequestPageComponent
  },
  {
    path: 'reset',
    component: PasswordResetPageComponent
  },
  {
    path:'maintenance',
    component:UnderDevelopmentPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'app',
    component: AppComponent,
    canActivate: [tokenGuard,authGuard],
    canActivateChild: [tokenGuard,authGuard],

    children: [
      {
        path:'',
        component:FeedComponent
      },

    ]
  },
  {
    path: 'ins/dashboard',
    component:InstituteDashboardComponent,
    canActivate: [authGuard,tokenGuard],
    canActivateChild: [instituteRoleGuard],
    children:[
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'course-mgt',
        children:[
          {
            path: '',
            component: InstituteCourseManagementComponent,
          },
          {
            path: 'create',
            component: CourseCreateComponent
          }
        ]
      }
    ]
  },
  {
    path: 'profile/:userSlug',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
