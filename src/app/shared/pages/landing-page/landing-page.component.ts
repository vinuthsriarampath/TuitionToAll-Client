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

import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [
    NgClass,
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  menuOpen = false;
  showMore = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleReadMore() {
    this.showMore = !this.showMore;
  }
}
