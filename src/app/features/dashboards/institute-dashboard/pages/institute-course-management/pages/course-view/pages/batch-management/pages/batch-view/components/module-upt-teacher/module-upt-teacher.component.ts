import {Component, Inject, inject} from '@angular/core';
import {
    DialogLayoutComponent
} from "../../../../../../../../../../../../../core/layouts/dialog-layout/dialog-layout.component";
import {ArrowRightLeft, LucideAngularModule, User} from "lucide-angular";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SelectComponent, SelectOption} from "../../../../../../../../../../../../../shared/ui/select/select.component";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AlertService} from '../../../../../../../../../../../../../core/services/alerts/alert.service';
import {ModuleService} from '../../../../../../../../../../../../../core/services/module/module.service';
import {FormErrorHandler} from '../../../../../../../../../../../../../core/helpers/FormErrorHandler';
import {
  InstituteTeacherService
} from '../../../../../../../../../../../../../core/services/institute-teacher/institute-teacher.service';
import {
  ModuleTeacherUpdateRequest
} from '../../../../../../../../../../../../../core/dto/request-dto/module/ModuleTeacherUpdateRequest';

export type ModuleUptTeacherDialogData = {
  moduleId:number;
  currentTeacherId:number;
  currentTeacherName:string;
}

@Component({
  selector: 'app-module-upt-teacher',
    imports: [
        DialogLayoutComponent,
        LucideAngularModule,
        ReactiveFormsModule,
        SelectComponent
    ],
  templateUrl: './module-upt-teacher.component.html',
  styleUrl: './module-upt-teacher.component.css'
})
export class ModuleUptTeacherComponent {
  protected loading:boolean = false;
  protected form!:FormGroup;
  protected teacherOptions:SelectOption[] = [];


  private readonly moduleId!:number;
  private readonly originalTeacherId!:number;
  protected readonly originalTeacherName!:string;


  private readonly dialogRef:MatDialogRef<ModuleUptTeacherComponent> = inject(MatDialogRef<ModuleUptTeacherComponent>);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly moduleService:ModuleService = inject(ModuleService);
  private readonly instituteTeacherService:InstituteTeacherService = inject(InstituteTeacherService);
  private readonly formBuilder:FormBuilder = inject(FormBuilder);
  private readonly formErrorHandler:FormErrorHandler = inject(FormErrorHandler);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data:ModuleUptTeacherDialogData) {

    this.moduleId = data.moduleId;
    this.originalTeacherId = data.currentTeacherId;
    this.originalTeacherName = data.currentTeacherName;

    this.loadAllTeachers();
    this.form = this.initializeForm(this.originalTeacherId);
  }

  private initializeForm(originalTeacherId:number):FormGroup{
    return this.formBuilder.group({
      teacherId: [originalTeacherId,Validators.required]
    })
  }


  private loadAllTeachers():void{
    this.instituteTeacherService.getAllTeachersByCurrentInstitute().subscribe({
      next: (res)=>{
        if(res.data){
          for (let teacher of res.data){
            this.teacherOptions.push({label: teacher.firstName+" "+teacher.lastName , value: teacher.id});
          }
        }
      },
      error: (err)=>{
        this.alertService.triggerErrorAlert(err.error.message);
      }
    })
  }

  protected onCancel():void{
    this.dialogRef.close();
  }

  protected onReset():void{
    this.form = this.initializeForm(this.originalTeacherId);
  }

  protected onSubmit():void{
    if(this.form.invalid || this.originalTeacherId == this.form.value.teacherId){
      this.alertService.triggerErrorAlert("Please select a new teacher for the module.");
      return;
    }

    this.triggerLoading();

    const request:ModuleTeacherUpdateRequest = this.form.value;

    this.moduleService.updateTeacher(this.moduleId,request).subscribe({
      next: (res)=>{
        if(res.data){
          this.triggerLoading();
          this.alertService.triggerSuccessAlert("Module teacher updated successfully.");
          this.dialogRef.close(true);
        }
      },
      error: (err)=>{
        this.formErrorHandler.handle(err,this.form,()=> this.triggerLoading());
      }
    })
  }

  private triggerLoading():void{
    this.loading = !this.loading;

    if(this.loading){
      this.form.disable({emitEvent:false})
    }else{
      this.form.enable();
    }
  }

  protected readonly ArrowRightLeft = ArrowRightLeft;
  protected readonly User = User;
}
