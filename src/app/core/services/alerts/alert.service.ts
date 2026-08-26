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

}
