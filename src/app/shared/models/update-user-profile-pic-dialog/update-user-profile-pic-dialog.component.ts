import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Institute} from '../../../core/models/user-models/sub-user-models/institute';
import {Teacher} from '../../../core/models/user-models/sub-user-models/teacher';
import {Student} from '../../../core/models/user-models/sub-user-models/student';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-update-user-profile-pic-dialog',
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule
  ],
  templateUrl: './update-user-profile-pic-dialog.component.html',
  styleUrl: './update-user-profile-pic-dialog.component.css'
})
export class UpdateUserProfilePicDialogComponent {

  userDetails!: Institute|Teacher|Student;
  imageUrl: string = '';
  selectedFile: File | null = null;
  constructor(
    public dialogRef: MatDialogRef<UpdateUserProfilePicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      userRole: string;
      details: Institute | Teacher | Student;
    }) {
    this.userDetails = {...data.details};
  }

  onConfirm(){
    this.dialogRef.close(this.userDetails);
  }

  onCancel(){
    this.dialogRef.close();
  }

  selectImage = (file: File)=> {
    this.imageUrl = URL.createObjectURL(file);
    this.selectedFile = file;
  }

  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectImage(file);
    }
  }

  onSubmit(){
    console.log("test pic submit");
  }

  onReset(){
    this.imageUrl = '';
    this.selectedFile = null;
  }
}
