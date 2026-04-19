import {Component, Inject, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {QuillEditorComponent} from "ngx-quill";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TeacherVacancy} from '../../../../../../../../../core/models/teacher-vacancy';
import {isFutureDate} from '../../../../../../../../../core/helpers/form-custom-validators';
import {TeacherVacancyService} from '../../../../../../../../../core/services/teacher-vacancy/teacher-vacancy.service';
import {TeacherVacancyStatus} from '../../../../../../../../../core/enums/teacher-vacancy-status';
import {
  TeacherVacancyUpdateRequest
} from '../../../../../../../../../core/dto/request-dto/teacher-vacancy/teacher-vacancy-update-request';
import {AlertService} from '../../../../../../../../../core/services/alerts/alert.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-update-teacher-vacancy-dialog',
  imports: [
    FormsModule,
    QuillEditorComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './update-teacher-vacancy-dialog.component.html',
  styleUrl: './update-teacher-vacancy-dialog.component.css'
})
export class UpdateTeacherVacancyDialogComponent {

  protected form!:FormGroup;
  protected readonly vacancy!:TeacherVacancy;
  protected readonly teacherVacancyStatus = Object.values(TeacherVacancyStatus)
  protected loading:boolean=false;

  private readonly dialogRef = inject(MatDialogRef<UpdateTeacherVacancyDialogComponent>);
  private readonly formBuilder = inject(FormBuilder);
  private readonly teacherVacancyService = inject(TeacherVacancyService);
  private readonly alertService = inject(AlertService);

  constructor(@Inject(MAT_DIALOG_DATA) data:TeacherVacancy) {
    this.vacancy = data;
    this.form=this.initializeUpdateForm(data);
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ]
  };

  protected onCancel():void{
    this.dialogRef.close();

  }protected onReset():void{
    this.form.reset();
    this.form = this.initializeUpdateForm(this.vacancy);
  }

  protected onSubmit():void{
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.triggerLoading();
    const request:TeacherVacancyUpdateRequest = this.form.value;
    this.teacherVacancyService.updateVacancy(this.vacancy.id, request).subscribe({
      next: (res) =>{
        this.alertService.triggerSuccessAlert("Vacancy Created Successfully");
        this.dialogRef.close(res);
      },
      error: (err) => {
        const errors =  err.error?.errors;

        if (errors && errors.length > 0) {
          for (const e of errors) {
            this.form.get(e.field)?.setErrors({
              server: e.message
            });
          }
          this.triggerLoading();
        }else if(err.error?.message){
          this.triggerLoading();
          this.form.setErrors({server: err.error.message});
        }else {
          this.triggerLoading();
          this.alertService.triggerErrorAlert("An unexpected error occurred");
          this.form.setErrors({server: "An unexpected error occurred"});
        }
      }
    })
  }

  protected initializeUpdateForm(vacancy:TeacherVacancy): FormGroup {
    return this.formBuilder.group({
      title: [vacancy.title,Validators.required],
      requiredExperienceYears: [vacancy.requiredExperienceYears,[Validators.required , Validators.min(0)]],
      jobDescription: [vacancy.jobDescription,Validators.required],
      status: [vacancy.status,Validators.required],
      vacancyClosingDate: [vacancy.vacancyClosingDate,[Validators.required]]
    })
  }

  private triggerLoading():void{
    this.loading = !this.loading;

    if (this.loading) {
      this.form.disable({emitEvent:false});
    } else {
      this.form.enable();
    }
  }
}
