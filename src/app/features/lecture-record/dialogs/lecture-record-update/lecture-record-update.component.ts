import {Component, Inject, inject} from '@angular/core';
import {LectureRecordResponse} from '../../dtos/response/LectureRecordResponse';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LectureRecordService} from '../../services/lecture-record/lecture-record.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AlertService} from '../../../../core/services/alerts/alert.service';
import {FormErrorHandler} from '../../../../shared/utils/helpers/FormErrorHandler';
import {LectureRecordDetailsUpdateRequest} from '../../dtos/request/LectureRecordDetailsUpdateRequest';
import {DialogLayoutComponent} from '../../../../core/layouts/dialog-layout/dialog-layout.component';
import {SquarePen} from 'lucide-angular';
import {InputComponent} from '../../../../shared/ui/input/input.component';

@Component({
  selector: 'app-lecture-record-update',
  imports: [
    DialogLayoutComponent,
    ReactiveFormsModule,
    InputComponent
  ],
  templateUrl: './lecture-record-update.component.html',
  styleUrl: './lecture-record-update.component.css'
})
export class LectureRecordUpdateComponent{

  protected  loading:boolean = false;
  protected form!:FormGroup;
  private readonly originalLectureRecord!:LectureRecordResponse;

  private readonly dialogRef:MatDialogRef<LectureRecordUpdateComponent> = inject(MatDialogRef<LectureRecordUpdateComponent>);
  private readonly lectureRecordService:LectureRecordService = inject(LectureRecordService);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly formErrorHandler:FormErrorHandler = inject(FormErrorHandler);
  private readonly formBuilder:FormBuilder = inject(FormBuilder);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data:LectureRecordResponse) {
    this.originalLectureRecord = data;
    this.form = this.initializeForm();
  }

  private initializeForm():FormGroup{
    return this.formBuilder.group({
      title: [this.originalLectureRecord.title,Validators.required],
      recordedDate: [this.originalLectureRecord.recordedDate,Validators.required]
    })
  }

  protected onCancel():void{
    this.dialogRef.close();
  }

  protected onReset():void{
    this.form = this.initializeForm();
  }

  protected onSubmit():void{
    if(this.form.invalid){
      this.form.markAsTouched();
      return;
    }

    this.triggerLoading();

    const request:LectureRecordDetailsUpdateRequest = this.form.value;

    this.lectureRecordService.updateLectureRecordDetails(this.originalLectureRecord.id,request).subscribe({
      next:(res)=>{
        if(res.data){
          this.triggerLoading();
          this.alertService.triggerSuccessAlert(res.message);
          this.dialogRef.close(res.data);
        }
      },
      error:(err)=>{
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

  protected readonly SquarePen = SquarePen;
}
