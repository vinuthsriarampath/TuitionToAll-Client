import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from '../../../core/services/auth/authentication.service';
import {AlertService} from '../../../core/services/alerts/alert.service';

@Component({
  selector: 'app-reset-password-request-page',
  imports: [
    RouterLink,
    NgIf,
    FormsModule,
    NgClass
  ],
  templateUrl: './reset-password-request-page.component.html',
  styleUrl: './reset-password-request-page.component.css'
})
export class ResetPasswordRequestPageComponent {

  userEmail: string = "";
  loading: boolean =false;
  success: boolean = false;

  constructor(private  readonly authService:AuthenticationService, private readonly  alertService:AlertService) {
  }

  onSubmit() {
    this.triggerLoading();
    if (this.userEmail){
      this.authService.resetPasswordRequest(this.userEmail).subscribe(
        {
          next: (res)=>{
            this.alertService.triggerSuccessAlert(res.message);
            this.triggerLoading();
            this.triggerSuccess();
          },
          error: (err)=>{
            this.alertService.triggerErrorAlert(err.error.message);
            this.triggerLoading();
          }
        }
      )
    }
  }

  triggerLoading(){
    this.loading = !this.loading;
  }
  triggerSuccess(){
    this.success = !this.success;
  }
}
