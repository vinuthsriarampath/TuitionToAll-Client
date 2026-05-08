import {Component, Inject, inject} from '@angular/core';
import {LucideAngularModule, LucideIconData} from 'lucide-angular';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgClass} from '@angular/common';

export interface ConfirmationDialogData {
  title: string;
  message: string;

  confirmText: string;
  cancelText?: string;

  confirmButtonClass: string;

  type: 'danger' | 'warning' | 'info' | 'success';

  icon: LucideIconData;
}

@Component({
  selector: 'app-confirmation-dialog',
  imports: [
    LucideAngularModule,
    NgClass
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {

  private readonly dialogRef:MatDialogRef<ConfirmationDialogComponent> = inject(MatDialogRef<ConfirmationDialogData>);

  constructor( @Inject(MAT_DIALOG_DATA) protected readonly data:ConfirmationDialogData) {
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
