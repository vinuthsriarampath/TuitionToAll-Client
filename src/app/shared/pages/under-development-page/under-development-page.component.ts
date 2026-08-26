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

import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {ArrowLeft, Cloud, Cog, Home, LucideAngularModule, Wrench} from 'lucide-angular';

@Component({
  selector: 'app-under-development-page',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './under-development-page.component.html',
  styleUrl: './under-development-page.component.css'
})
export class UnderDevelopmentPageComponent {
  private readonly window = globalThis.window
  private readonly router:Router = inject(Router);

  goHome() {
    this.router.navigate(['/']);
  }

  goBack() {
    window.history.back();
  }

  protected readonly Cloud = Cloud;
  protected readonly ArrowLeft = ArrowLeft;
  protected readonly Home = Home;
  protected readonly Wrench = Wrench;
  protected readonly Cog = Cog;
}
