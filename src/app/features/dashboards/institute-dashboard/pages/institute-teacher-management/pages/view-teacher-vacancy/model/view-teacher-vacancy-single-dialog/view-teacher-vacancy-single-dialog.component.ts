import {Component, Inject, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TeacherVacancy} from '../../../../../../../../../core/models/teacher-vacancy';
import {DatePipe, NgClass} from '@angular/common';
import {TeacherVacancyStatus} from '../../../../../../../../../core/enums/teacher-vacancy-status';

@Component({
  selector: 'app-view-teacher-vacancy-single-dialog',
  imports: [
    DatePipe,
    NgClass
  ],
  templateUrl: './view-teacher-vacancy-single-dialog.component.html',
  styleUrl: './view-teacher-vacancy-single-dialog.component.css'
})
export class ViewTeacherVacancySingleDialogComponent {

  protected vacancy!:TeacherVacancy ;
  protected readonly TeacherVacancyStatus = TeacherVacancyStatus;

  private readonly dialogRef = inject(MatDialogRef<ViewTeacherVacancySingleDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data:TeacherVacancy) {
    this.vacancy = data;
  }

  protected onCancel():void{
    this.dialogRef.close();
  }

  protected onEdit():void{
    this.dialogRef.close(true);
  }

}
