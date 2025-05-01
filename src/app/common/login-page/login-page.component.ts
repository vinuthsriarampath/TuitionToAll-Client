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

import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserLoginRequest } from '../../core/dto/request-dto/login-dto/user-login-request';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthResponse } from '../../core/dto/response-dto/auth-response';
import { AuthenticationService } from '../../core/services/auth/authentication.service';

@Component({
  selector: 'app-login-dto-page',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  userLoginRequest: UserLoginRequest = {};
  authResponse: AuthResponse = {};

  isLoading:boolean=false;
  errorMessage?:string;
  error?:boolean;
  constructor(private authService: AuthenticationService, private router:Router) {}

  login() {
    this.isLoading=true;
    this.errorMessage='';

    if (this.userLoginRequest.email && this.userLoginRequest.password) {

      this.authService.login(this.userLoginRequest).subscribe({

        next: (response) => {

          if (response) {

            this.authResponse = response;
            localStorage.setItem('token',response.token as string)
            localStorage.setItem('user',JSON.stringify(response.user))
            localStorage.setItem('role',JSON.stringify(response.user?.role))
            this.isLoading=false;
            this.router.navigate(['dashboard'])
          } else {

            this.errorMessage='UnExpected Error ! ';
            this.isLoading=false;
            this.hideErrorAfterDelay();

          }
        },
        error: (error) => {

          this.errorMessage=error.error.message;
          this.isLoading=false;
          this.hideErrorAfterDelay();

        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  hideErrorAfterDelay() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
