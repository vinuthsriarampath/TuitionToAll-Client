import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {InformationAlertComponent} from '@shared/components/information-alert/information-alert.component';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData
} from '@shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import {NotificationResponse} from '@features/notifications/dtos/responses/notification-response';
import {NotificationType} from '@features/notifications/enums/notification-type';
import {Router} from '@angular/router';
import {NotificationSnackbarComponent} from '@shared/snackbars/notification-snackbar/notification-snackbar.component';
import { ErrorSnackbarComponent } from "@shared/snackbars/error-snackbar/error-snackbar.component";
import {SuccessSnackbarComponent} from '@shared/snackbars/success-snackbar/success-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private readonly dialog:MatDialog = inject(MatDialog);
  private readonly router = inject(Router);

  constructor( private readonly snackBar:MatSnackBar) { }

  triggerSuccessAlert(text = 'Successfully !'): void {
    this.snackBar.openFromComponent(SuccessSnackbarComponent, {
      data: text,
      duration: 5000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['bg-transparent', 'shadow-none', 'p-0']
    });
  }

  triggerErrorAlert(text = 'Something went wrong !'): void {
    this.snackBar.openFromComponent(ErrorSnackbarComponent, {
      data: text,
      duration: 5000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['bg-transparent', 'shadow-none', 'p-0']
    });
  }

  notification(notification: NotificationResponse): void {
    this.snackBar.openFromComponent(NotificationSnackbarComponent, {
      data: notification,
      duration: 10000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['bg-transparent', 'shadow-none', 'p-0']
    });
  }

  triggerSuccessConfirmationAlert(dialogData: ConfirmationDialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      disableClose: true,
      panelClass: 'confirmation-dialog',
      data: dialogData
    });

    return dialogRef.afterClosed().pipe(
      map(result => result ?? false)
    );
  }

  triggerInformationAlert(title?: string, description?: string): Observable<boolean> {
    const dialogRef = this.dialog.open(InformationAlertComponent, {
      maxWidth: '40vw',
      width: '100%',
      panelClass: 'information-alert',
      data: {
        title: title ?? 'Attention !',
        description: description ?? 'This is an important message'
      }
    });

    return dialogRef.afterClosed().pipe(
      map(result => result ?? false)
    );
  }

}
