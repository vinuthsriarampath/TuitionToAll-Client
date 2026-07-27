import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  KeyRound,
  Loader2,
  LucideAngularModule,
  Mail,
  Send,
  X
} from 'lucide-angular';
import {CardShellComponent} from '@shared/ui';

@Component({
  selector: 'app-reset-password-request-page',
  imports: [
    RouterLink,
    FormsModule,
    NgClass,
    LucideAngularModule,
    RouterLinkActive,
    CardShellComponent
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

  protected readonly ArrowLeft = ArrowLeft;
  protected readonly CheckCircle2 = CheckCircle2;
  protected readonly Loader2 = Loader2;
  protected readonly Send = Send;
  protected readonly Mail = Mail;
  protected readonly X = X;
  protected readonly KeyRound = KeyRound;
  protected readonly GraduationCap = GraduationCap;
}
