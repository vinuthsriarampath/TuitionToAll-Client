import {Component, inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {QuillEditorComponent} from 'ngx-quill';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {getDateTime} from '../../../../shared/utils/helpers/date-helper';
import {isFutureDate} from '../../../../shared/utils/validators/form-custom-validators';
import {TeacherVacancyService} from '../../services/teacher-vacancy/teacher-vacancy.service';
import {
  TeacherVacancyCreateRequest
} from '../../dtos/request/teacher-vacancy-create-request';
import {AlertService} from '../../../../core/services/alerts/alert.service';
import {DialogLayoutComponent} from '../../../../core/layouts/dialog-layout/dialog-layout.component';
import {SquarePen} from 'lucide-angular';

@Component({
  selector: 'app-create-vacancy-dialog',
  imports: [
    QuillEditorComponent,
    FormsModule,
    ReactiveFormsModule,
    DialogLayoutComponent
  ],
  templateUrl: './create-vacancy-dialog.component.html',
  styleUrl: './create-vacancy-dialog.component.css'
})
export class CreateVacancyDialogComponent {

  protected form!:FormGroup;
  protected loading:boolean=false;

  private readonly teacherVacancyService = inject(TeacherVacancyService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<CreateVacancyDialogComponent>);
  private readonly alertService = inject(AlertService);

  modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ]
  };

  constructor() {
    this.form = this.initializeForm();
  }

  protected initializeForm(): FormGroup {
    return this.formBuilder.group({
      title: ['',Validators.required],
      requiredExperienceYears: ['',[Validators.required , Validators.min(0)]],
      jobDescription: ['',Validators.required],
      vacancyClosingDate: [getDateTime(0,0,7),[Validators.required, isFutureDate()]]
    })
  }

  protected onCancel(): void{
    this.dialogRef.close();
  }

  protected onSubmit(): void{

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.triggerLoading();

    const teacherVacancyCreateRequest:TeacherVacancyCreateRequest = this.form.value;

    this.teacherVacancyService.createVacancy(teacherVacancyCreateRequest).subscribe({
      next: () => {
        this.alertService.triggerSuccessAlert("Vacancy Created Successfully");
        this.dialogRef.close();
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
    });
  }

  protected onReset(): void{
    this.form.reset();
    this.form = this.initializeForm();
  }

  protected triggerLoading():void{
    this.loading = !this.loading;

    if (this.loading) {
      this.form.disable({emitEvent:false});
    } else {
      this.form.enable();
    }
  }

  protected readonly SquarePen = SquarePen;
}
