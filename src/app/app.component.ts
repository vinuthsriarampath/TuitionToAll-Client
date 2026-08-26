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

import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';
import {initFlowbite} from 'flowbite';
import {QuillModule} from 'ngx-quill';
import {AuthenticationService} from '@features/auth/services/auth/authentication.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,QuillModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  private readonly authService:AuthenticationService = inject(AuthenticationService);

  ngOnInit(): void {
    initFlowbite();
    this.authService.restoreSession().subscribe();
  }
  title = 'TuitionToAll';
}
