import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserLoginRequest } from '../../requestDtos/user-login-request';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthResponse } from '../../responseDtos/auth-response';
import { AuthenticationServiceService } from '../../services/auth/authentication-service.service';

@Component({
  selector: 'app-login-page',
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
  constructor(private authService: AuthenticationServiceService, private router:Router) {}

  login() {
    this.isLoading=true;
    this.errorMessage='';

    if (this.userLoginRequest.email && this.userLoginRequest.password) {

      this.authService.login(this.userLoginRequest).subscribe({

        next: (response) => {

          if (response) {

            this.authResponse = response;
            localStorage.setItem('token',response.token as string)
            this.isLoading=false;
            this.router.navigate(['maintenance'])
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
