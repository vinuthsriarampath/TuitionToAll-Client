import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {ArrowLeft, Check, GraduationCap, Loader2, Lock, LucideAngularModule, X} from 'lucide-angular';

@Component({
  selector: 'app-password-reset-page',
  imports: [
    FormsModule,
    NgClass,
    RouterLink,
    LucideAngularModule,
    RouterLinkActive
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

  protected readonly Loader2 = Loader2;
  protected readonly Check = Check;
  protected readonly X = X;
  protected readonly Lock = Lock;
  protected readonly ArrowLeft = ArrowLeft;
  protected readonly GraduationCap = GraduationCap;
}
