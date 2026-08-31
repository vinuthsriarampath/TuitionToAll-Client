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
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {
  AlertCircle,
  ArrowRight,
  GraduationCap,
  Loader2,
  Lock,
  LogIn,
  LucideAngularModule,
  Mail,
  ShieldCheck,
  UserPlus,
  X
} from 'lucide-angular';
import {CardShellComponent} from '@shared/ui';
import {FooterComponent} from '@shared/components/footer/footer.component';
import {HeaderComponent} from '@shared/components/header/header.component';

@Component({
  selector: 'app-login-dto-page',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    RouterLinkActive,
    LucideAngularModule,
    CardShellComponent,
    FooterComponent,
    HeaderComponent,
    NgOptimizedImage
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  userLoginRequest: UserLoginRequest = new UserLoginRequest();

  isLoading:boolean=false;
  errorMessage?:string;
  error?:boolean;
  private readonly authService: AuthenticationService = inject(AuthenticationService);
  private readonly router:Router = inject(Router);

  login() {
    this.isLoading=true;
    this.errorMessage='';

    if (this.userLoginRequest.email && this.userLoginRequest.password) {

      this.authService.login(this.userLoginRequest).subscribe({

        next: (response) => {

          if (response) {
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
      this.errorMessage='Please fill in all required fields.';
      this.isLoading=false;
      this.hideErrorAfterDelay();
    }
  }

  hideErrorAfterDelay() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  protected readonly AlertCircle = AlertCircle;
  protected readonly Mail = Mail;
  protected readonly ShieldCheck = ShieldCheck;
  protected readonly UserPlus = UserPlus;
  protected readonly Lock = Lock;
  protected readonly X = X;
  protected readonly ArrowRight = ArrowRight;
  protected readonly GraduationCap = GraduationCap;
  protected readonly LogIn = LogIn;
  protected readonly Loader2 = Loader2;
}
