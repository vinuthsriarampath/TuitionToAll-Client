import {Component, Inject, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TeacherVacancy} from '../../dtos/response/teacher-vacancy';
import {DatePipe} from '@angular/common';
import {TeacherVacancyStatus} from '../../enums/teacher-vacancy-status';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillEditorComponent} from 'ngx-quill';
import {DialogLayoutComponent} from '@core/layouts';
import {InfoIcon, LucideIconData} from 'lucide-angular';
import {BadgeComponent, CardShellComponent} from '@shared/ui';

@Component({
  selector: 'app-view-teacher-vacancy-single-dialog',
  imports: [
    DatePipe,
    FormsModule,
    QuillEditorComponent,
    ReactiveFormsModule,
    DialogLayoutComponent,
    CardShellComponent,
    BadgeComponent
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
