import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor( private readonly snackBar:MatSnackBar) { }

  triggerSuccessAlert(message?:string){
    this.snackBar.open(
      message ?? 'Profile updated successfully!', '', {
        duration: 5000,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        panelClass: 'success-snackbar'
      }
    )
  }

  triggerErrorAlert(message?:string){
    this.snackBar.open(
      message ?? 'Something went wrong !','',{
        duration: 5000,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        panelClass: 'error-snackbar'
      }
    )
  }
}
