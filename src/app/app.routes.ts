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
import { UnderDevelopmentPageComponent } from './shared/pages/under-development-page/under-development-page.component';
import { authGuard } from './core/guards/auth-guard/auth.guard';
import { SignupPageComponent } from './features/auth/signup-page/signup-page.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {tokenGuard} from './core/guards/token-guard/token.guard';
import {PageNotFoundComponent} from './shared/pages/page-not-found/page-not-found.component';
import {UserProfileComponent} from './features/profile/user-profile/user-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [tokenGuard]
  },
  {
    path: 'auth/login-dto',
    component: LoginPageComponent
  },
  {
    path: 'auth/signup',
    component: SignupPageComponent
  },
  {
    path:'maintenance',
    component:UnderDevelopmentPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [tokenGuard]
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
