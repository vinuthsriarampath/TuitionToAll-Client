import {Component, Inject, inject} from '@angular/core';
import {DialogLayoutComponent} from "../../../../core/layouts/dialog-layout/dialog-layout.component";
import {ArrowRightLeft, LucideAngularModule, Users} from "lucide-angular";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SelectComponent, SelectOption} from "../../../../shared/ui/select/select.component";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AlertService} from '../../../../core/services/alerts/alert.service';
import {ModuleService} from '../../services/module/module.service';
import {BatchService} from '../../../../core/services/batch/batch.service';
import {FormErrorHandler} from '../../../../shared/utils/helpers/FormErrorHandler';
import {ModuleBatchUpdateRequest} from '../../dtos/request/ModuleBatchUpdateRequest';

export type ModuleUptBatchDialogData = {
  moduleId:number;
  currentCourseId:number;
  currentBatchId:number;
  currentBatchName:string;
}

@Component({
  selector: 'app-module-upt-batch',
    imports: [
        DialogLayoutComponent,
        LucideAngularModule,
        ReactiveFormsModule,
        SelectComponent
    ],
  templateUrl: './module-upt-batch.component.html',
  styleUrl: './module-upt-batch.component.css'
})
export class ModuleUptBatchComponent {
  protected loading:boolean = false;
  protected form!:FormGroup;
  protected batchOptions:SelectOption[] = [];

  private readonly courseId!:number;

  private readonly moduleId!:number;
  private readonly originalBatchId!:number;
  protected readonly originalBatchName!:string;


  private readonly dialogRef:MatDialogRef<ModuleUptBatchComponent> = inject(MatDialogRef<ModuleUptBatchComponent>);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly moduleService:ModuleService = inject(ModuleService);
  private readonly batchService:BatchService = inject(BatchService);
  private readonly formBuilder:FormBuilder = inject(FormBuilder);
  private readonly formErrorHandler:FormErrorHandler = inject(FormErrorHandler);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data:ModuleUptBatchDialogData) {

    this.moduleId = data.moduleId;
    this.originalBatchId = data.currentBatchId;
    this.originalBatchName = data.currentBatchName;

    if(data.currentCourseId){
      this.courseId = data.currentCourseId;
      this.form = this.initializeForm(this.originalBatchId);
      this.loadAllBatches();
    }else{
      this.alertService.triggerErrorAlert("Course id is missing in the route parameters.");
      this.dialogRef.close();
    }
  }

  private initializeForm(originalBatchId:number):FormGroup{
    return this.formBuilder.group({
      batchId: [originalBatchId,Validators.required]
    })
  }


  private loadAllBatches():void{
    this.batchService.getAllBatchesByCourseId(this.courseId).subscribe({
      next: (res)=>{
        if(res.data){
          for (let batch of res.data){
            this.batchOptions.push({label: batch.name, value: batch.id});
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
    this.form = this.initializeForm(this.originalBatchId);
  }

  protected onSubmit():void{
    if(this.form.invalid || this.originalBatchId == this.form.value.batchId){
      this.alertService.triggerErrorAlert("Please select a new batch for the module.");
      return;
    }

    this.triggerLoading();

    const request:ModuleBatchUpdateRequest = this.form.value;

    this.moduleService.updateBatch(this.moduleId,request).subscribe({
      next: (res)=>{
        if(res.data){
          this.triggerLoading();
          this.alertService.triggerSuccessAlert("Module batch updated successfully.");
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
  protected readonly Users = Users;
}
