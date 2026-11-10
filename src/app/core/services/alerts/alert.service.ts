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

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private readonly dialog:MatDialog = inject(MatDialog);

  constructor( private readonly snackBar:MatSnackBar) { }

  triggerSuccessAlert(message?:string){
    if(message) {
      this.snackBar.open(
        message ?? 'Profile updated successfully!', '', {
          duration: 5000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          panelClass: 'success-snackbar'
        }
      )
    }
  }

  triggerErrorAlert(message?: string) {
    if (message) {
      this.snackBar.open(
        message ?? 'Something went wrong !', '', {
          duration: 5000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          panelClass: 'error-snackbar'
        }
      )
    }
  }

  triggerSuccessConfirmationAlert(dialogData:ConfirmationDialogData):Observable<boolean>{
    const dialogRef= this.dialog.open(ConfirmationDialogComponent,{
      width: '450px',
      disableClose: true,
      panelClass:'confirmation-dialog',
      data: dialogData
    });

    return dialogRef.afterClosed().pipe(
      map(result => result ?? false)
    );
  }

  triggerInformationAlert(title?:string, description?:string):Observable<boolean>{
    const dialogRef = this.dialog.open(InformationAlertComponent,{
      maxWidth:'40vw',
      width:'100%',
      panelClass:'information-alert',
      data:{
        title:title ?? 'Attention !',
        description:description ?? 'This is an important message'
      }
    })

    return dialogRef.afterClosed().pipe(
      map(result => result ?? false)
    )
  }

  /**
   * Triggers an interactive toast alert for global notifications with a click-to-view action.
   */
  notification(notification: NotificationResponse, onViewAction: () => void): void {
    const panelClass = this.getPanelClassForType(notification.type);

    const snackBarRef = this.snackBar.open(
      `${notification.title}: ${notification.content}`,
      'View',
      {
        duration: 7000, // Longer duration for reading content
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        panelClass: [panelClass, 'interactive-notification-snackbar']
      }
    );

    // Handle click on the "View" action button
    snackBarRef.onAction().subscribe(() => {
      onViewAction();
    });
  }

  private getPanelClassForType(type: NotificationType): string {
    switch (type) {
      case NotificationType.CHAT: return 'chat-notification-snackbar';
      case NotificationType.ANNOUNCEMENT: return 'announcement-notification-snackbar';
      case NotificationType.ASSIGNMENT: return 'assignment-notification-snackbar';
      case NotificationType.LECTURE:
      case NotificationType.RESOURCE: return 'resource-notification-snackbar';
      default: return 'default-notification-snackbar';
    }
  }

}
