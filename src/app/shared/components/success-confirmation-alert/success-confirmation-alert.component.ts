import {Component, Inject, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CheckCircle, LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-success-confirmation-alert',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './success-confirmation-alert.component.html',
  styleUrl: './success-confirmation-alert.component.css'
})
export class SuccessConfirmationAlertComponent {

  private readonly dialogRef:MatDialogRef<SuccessConfirmationAlertComponent> = inject(MatDialogRef<SuccessConfirmationAlertComponent>);
  protected readonly message!:string;
  protected readonly description!:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message:string,description:string}) {
    this.message = data.message;
    this.description = data.description;
  }

  onConfirm(){
    this.dialogRef.close(true);
  }

  onCancel(){
    this.dialogRef.close(false);
  }

  protected readonly CheckCircle = CheckCircle;
}
