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
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {UserLoginRequest} from '../../dtos/request/user-login-request';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {UserService} from '../../../profile/services/user/user.service';

@Component({
  selector: 'app-login-dto-page',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    RouterLinkActive
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  userLoginRequest: UserLoginRequest = {};

  isLoading:boolean=false;
  errorMessage?:string;
  error?:boolean;
  private readonly userService:UserService = inject(UserService);
  constructor(private readonly authService: AuthenticationService, private readonly router:Router) {}

  login() {
    this.isLoading=true;
    this.errorMessage='';

    if (this.userLoginRequest.email && this.userLoginRequest.password) {

      this.authService.login(this.userLoginRequest).subscribe({

        next: (response) => {

          if (response) {
            localStorage.setItem('token',response.token as string)
            if(response.user) this.userService.setCurrentUser(response?.user)

            this.isLoading=false;
            this.router.navigate(['app'])
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
