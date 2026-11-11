import {Component, inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import {AlertCircle, LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-error-snackbar',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './error-snackbar.component.html',
  styleUrl: './error-snackbar.component.css'
})
export class ErrorSnackbarComponent {
  readonly snackBarRef = inject(MatSnackBarRef<ErrorSnackbarComponent>);
  readonly message = inject<string>(MAT_SNACK_BAR_DATA);
  protected readonly AlertCircle = AlertCircle;
}
