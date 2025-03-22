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

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { isDevMode, provideAppInitializer } from '@angular/core';
import { inject as vercelInject } from '@vercel/analytics';

function initializeAnalytics() {
  vercelInject({ mode: isDevMode() ? 'development' : 'production' });
}

setTimeout(() => {
  bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
      ...(appConfig.providers || []),
      provideAppInitializer(initializeAnalytics)
    ]
  })
  .catch(err => console.error(err));
}, 3000);
