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
import {LandingPageComponent} from './common/landing-page/landing-page.component';
import { LoginPageComponent } from './common/login-page/login-page.component';
import { UnderDevelopmentPageComponent } from './common/under-development-page/under-development-page.component';
import { authGuard } from './services/auth/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'auth/login',
    component: LoginPageComponent
  },
  {
    path:'maintenance',
    component:UnderDevelopmentPageComponent,
    canActivate: [authGuard]
  }
];
