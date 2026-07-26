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

import {CommonModule, NgClass} from '@angular/common';
import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  Check, ChevronDown, ChevronUp,
  GraduationCap,
  Layers, LogIn,
  LucideAngularModule, Menu,
  Sliders, Sparkles,
  UserCheck, UserPlus,
  Users, X
} from 'lucide-angular';

@Component({
  selector: 'app-landing-page',
  imports: [
    NgClass,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule
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

  protected readonly GraduationCap = GraduationCap;
  protected readonly Check = Check;
  protected readonly UserCheck = UserCheck;
  protected readonly Sliders = Sliders;
  protected readonly Layers = Layers;
  protected readonly Building2 = Building2;
  protected readonly Users = Users;
  protected readonly BookOpenCheck = BookOpenCheck;
  protected readonly ChevronUp = ChevronUp;
  protected readonly ChevronDown = ChevronDown;
  protected readonly Sparkles = Sparkles;
  protected readonly ArrowRight = ArrowRight;
  protected readonly Menu = Menu;
  protected readonly X = X;
  protected readonly LogIn = LogIn;
  protected readonly UserPlus = UserPlus;
}
