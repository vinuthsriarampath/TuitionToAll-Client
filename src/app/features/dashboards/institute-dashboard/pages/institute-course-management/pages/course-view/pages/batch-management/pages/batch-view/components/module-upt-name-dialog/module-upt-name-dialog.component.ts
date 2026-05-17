import {Component, Inject, inject} from '@angular/core';
import {
  DialogLayoutComponent
} from '../../../../../../../../../../../../../core/layouts/dialog-layout/dialog-layout.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AlertService} from '../../../../../../../../../../../../../core/services/alerts/alert.service';
import {ModuleService} from '../../../../../../../../../../../../../core/services/module/module.service';
import {Edit} from 'lucide-angular';
import {InputComponent} from '../../../../../../../../../../../../../shared/ui/input/input.component';
import {
  ModuleNameUpdateRequest
} from '../../../../../../../../../../../../../core/dto/request-dto/module/ModuleNameUpdateRequest';
import {FormErrorHandler} from '../../../../../../../../../../../../../core/helpers/FormErrorHandler';

export type ModuleUptNameDialogData = {
  moduleId:number,
  currentName:string
}

@Component({
  selector: 'app-module-upt-name-dialog',
  imports: [
    DialogLayoutComponent,
    InputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './module-upt-name-dialog.component.html',
  styleUrl: './module-upt-name-dialog.component.css'
})
export class ModuleUptNameDialogComponent{

  private readonly moduleId!:number;
  private readonly originalName!:string;

  protected loading:boolean = false;
  protected form!:FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data:ModuleUptNameDialogData) {
    this.moduleId = data.moduleId;
    this.originalName = data.currentName;
    this.form = this.initializeForm(data.currentName);
  }


  private readonly dialogRef:MatDialogRef<ModuleUptNameDialogComponent> = inject(MatDialogRef<ModuleUptNameDialogComponent>);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly moduleService:ModuleService = inject(ModuleService);
  private readonly formBuilder:FormBuilder = inject(FormBuilder);
  private readonly formErrorHandler:FormErrorHandler = inject(FormErrorHandler);

  private initializeForm(currentName:string):FormGroup{
    return this.formBuilder.group({
      name: [currentName,Validators.required]
    })
  }

  onCancel():void{
    this.dialogRef.close();
  }

  onReset():void{
    this.form = this.initializeForm(this.originalName);
  }

  onSubmit():void{
    if (this.form.invalid || this.form.value.name === this.originalName) {
      this.alertService.triggerErrorAlert('Please enter a new name for the module.');
      return;
    }

    this.triggerLoading();

    const request:ModuleNameUpdateRequest = this.form.value;

    this.moduleService.updateModuleName(this.moduleId,request).subscribe({
      next: (res)=>{
        if(res.data){
          this.triggerLoading();
          this.dialogRef.close(res.data.name);
        }
      },
      error: (err) => {
        this.formErrorHandler.handle(err,this.form,()=> this.triggerLoading());
      }
    })
  }
  protected triggerLoading():void{
    this.loading = !this.loading;

    if(this.loading){
      this.form.disable({emitEvent:false})
    }else {
      this.form.enable();
    }
  }

  protected readonly Edit = Edit;
}
