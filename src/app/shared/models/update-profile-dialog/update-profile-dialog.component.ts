import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {Institute} from '../../../models/userModels/institute';
import {Teacher} from '../../../models/userModels/teacher';
import {Student} from '../../../models/userModels/student';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-update-profile-dialog',
  imports: [
    FormsModule,
    NgIf,
  ],
  templateUrl: './update-profile-dialog.component.html',
  styleUrl: './update-profile-dialog.component.css'
})
export class UpdateProfileDialogComponent {

  userDetails!: any;

  constructor(
    public dialogRef:MatDialogRef<UpdateProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{
      userRole: string;
      details: Institute|Teacher|Student;
    }) {
    this.userDetails = {...data.details};
  }


  onConfirm(){
    this.dialogRef.close(true);
  }

  onCancel(){
    this.dialogRef.close(false);
  }

  onSubmit() {
    this.onConfirm();
  }
}
