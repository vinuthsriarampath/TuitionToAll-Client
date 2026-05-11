import {Component, Inject, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TeacherVacancy} from '../../../../../../../../../core/models/teacher-vacancy';
import {DatePipe, NgClass} from '@angular/common';
import {TeacherVacancyStatus} from '../../../../../../../../../core/enums/teacher-vacancy-status';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillEditorComponent} from 'ngx-quill';
import {DialogLayoutComponent} from '../../../../../../../../../core/layouts/dialog-layout/dialog-layout.component';
import {InfoIcon, LucideIconData} from 'lucide-angular';

@Component({
  selector: 'app-view-teacher-vacancy-single-dialog',
  imports: [
    DatePipe,
    NgClass,
    FormsModule,
    QuillEditorComponent,
    ReactiveFormsModule,
    DialogLayoutComponent
  ],
  templateUrl: './view-teacher-vacancy-single-dialog.component.html',
  styleUrl: './view-teacher-vacancy-single-dialog.component.css'
})
export class ViewTeacherVacancySingleDialogComponent {

  protected vacancy!:TeacherVacancy ;
  protected readonly TeacherVacancyStatus = TeacherVacancyStatus;

  private readonly dialogRef = inject(MatDialogRef<ViewTeacherVacancySingleDialogComponent>);
  protected InfoIcon: LucideIconData = InfoIcon

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
