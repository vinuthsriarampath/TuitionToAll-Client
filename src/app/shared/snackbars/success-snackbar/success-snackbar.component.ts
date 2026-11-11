import {Component, inject} from '@angular/core';
import {CheckCircle2, LucideAngularModule} from 'lucide-angular';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-snackbar',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './success-snackbar.component.html',
  styleUrl: './success-snackbar.component.css'
})
export class SuccessSnackbarComponent {
  readonly snackBarRef = inject(MatSnackBarRef<SuccessSnackbarComponent>);
  readonly message = inject<string>(MAT_SNACK_BAR_DATA);
  protected readonly CheckCircle2 = CheckCircle2;
}
