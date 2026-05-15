import {Component, Inject, inject} from '@angular/core';
import {
  DialogLayoutComponent
} from '../../../../../../../../../../../../../core/layouts/dialog-layout/dialog-layout.component';
import {Book} from 'lucide-angular';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ModuleStatus} from '../../../../../../../../../../../../../core/enums/ModuleStatus';
import {
  InstituteTeacherService
} from '../../../../../../../../../../../../../core/services/institute-teacher/institute-teacher.service';
import {AlertService} from '../../../../../../../../../../../../../core/services/alerts/alert.service';
import {ModuleService} from '../../../../../../../../../../../../../core/services/module/module.service';
import {
  ModuleCreateRequest
} from '../../../../../../../../../../../../../core/dto/request-dto/module/ModuleCreateRequest';
import {
  ModuleCreateStatus
} from '../../../../../../../../../../../../../core/dto/request-dto/module/enums/ModuleCreateStatus';
import {FormErrorHandler} from '../../../../../../../../../../../../../core/helpers/FormErrorHandler';
import {InputComponent} from '../../../../../../../../../../../../../shared/ui/input/input.component';
import {
  SelectComponent,
  SelectOption
} from '../../../../../../../../../../../../../shared/ui/select/select.component';

@Component({
  selector: 'app-create-module-dialog',
  imports: [
    DialogLayoutComponent,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent
  ],
  templateUrl: './create-module-dialog.component.html',
  styleUrl: './create-module-dialog.component.css'
})
export class CreateModuleDialogComponent {

  protected loading:boolean = false;
  protected form!:FormGroup;
  protected teacherOptions:SelectOption[] = [];
  protected statusOptions:SelectOption[] = [];
  private readonly batchId!:number;

  private readonly dialogRef:MatDialogRef<CreateModuleDialogComponent> = inject(MatDialogRef<CreateModuleDialogComponent>);
  private readonly formBuilder:FormBuilder = inject(FormBuilder);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly moduleService:ModuleService = inject(ModuleService);
  private readonly instituteTeacherService:InstituteTeacherService = inject(InstituteTeacherService);
  private readonly formErrorHandler:FormErrorHandler = inject(FormErrorHandler);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data:number) {
    this.batchId = data;
    this.loadCurrentInstituteTeachers();
    this.initializeStatusOptionList();
    this.form = this.initializeForm();
  }

  protected initializeForm():FormGroup{
    return this.formBuilder.group({
      name: [null],
      status: [ModuleStatus.DRAFT,Validators.required],
      batchId:[this.batchId],
      teacherId:[null,Validators.required]
    })
  }

  private initializeStatusOptionList(){
    for (let status of Object.values(ModuleCreateStatus)) {
      this.statusOptions.push({label: status, value: status})
    }
  }

  protected onCancel():void{
    this.dialogRef.close();
  }

  protected onReset():void{
    this.form = this.initializeForm();
  }

  protected loadCurrentInstituteTeachers():void{
    this.instituteTeacherService.getAllTeachersByCurrentInstitute().subscribe({
      next: (res)=>{
        if(res.data){
          this.teacherOptions = [];
          for (let teacher of res.data){
            this.teacherOptions.push({label: teacher.firstName+" "+teacher.lastName, value: teacher.id})
          }
        }
      },
      error: (err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
      }
    });
  }

  protected onSubmit():void{
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.triggerLoading();

    const request:ModuleCreateRequest = this.form.value;

    this.moduleService.createModule(request).subscribe({
      next: ()=>{
        this.triggerLoading();
        this.dialogRef.close();
      },
      error: (err)=>{
        this.formErrorHandler.handle(err,this.form,() => this.triggerLoading())
      }
    })

  }

  protected triggerLoading():void{
    this.loading = !this.loading;

    if (this.loading){
      this.form.disable({emitEvent:false})
    }else {
      this.form.enable();
    }
  }

  protected readonly Book = Book;
}
