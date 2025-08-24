import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {AuthenticationService} from '../../../core/services/auth/authentication.service';
import {AlertService} from '../../../core/services/alerts/alert.service';

@Component({
  selector: 'app-password-reset-page',
  imports: [
    FormsModule,
    NgIf,
    NgClass,
    RouterLink
  ],
  templateUrl: './password-reset-page.component.html',
  styleUrl: './password-reset-page.component.css'
})
export class PasswordResetPageComponent {
  token: string | null = null;
  newPassword: string = "";
  confirmPassword: string = "";
  loading: boolean =false;

  constructor(private readonly route: ActivatedRoute, private readonly authService:AuthenticationService, private readonly alertService:AlertService, private readonly router:Router) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  onSubmit() {
    this.triggerLoading();
    if (this.token){
      if (!!this.newPassword && (this.newPassword === this.confirmPassword)) {
        this.authService.PasswordReset(this.token, this.newPassword).subscribe(
          {
            next: (res) => {
              this.alertService.triggerSuccessAlert(res.message)
              this.triggerLoading();
              this.router.navigate(['/auth/login']);
            },
            error: (err) => {
              this.alertService.triggerErrorAlert(err.error.message);
              this.triggerLoading();
            }
          }
        )
      }else {
        this.alertService.triggerErrorAlert("Passwords do not match");
        this.triggerLoading();
      }
    }else {
      this.alertService.triggerErrorAlert("Invalid Token");
      this.triggerLoading();
    }
  }

  triggerLoading(){
    this.loading = !this.loading;
  }
}
