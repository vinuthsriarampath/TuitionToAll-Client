import {Component, Inject, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AlertService} from '../../../../../../../../../../../../../core/services/alerts/alert.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormErrorHandler} from '../../../../../../../../../../../../../shared/utils/helpers/FormErrorHandler';
import {
  ScheduleLectureService
} from '../../../../../../../../../../../../../core/services/schedule-lecture/schedule-lecture.service';
import {
  ScheduleLectureResponse
} from '../../../../../../../../../../../../../core/dto/response-dto/schedule-lectures/ScheduleLectureResponse';
import {
  ScheduleLectureUpdateRequest
} from '../../../../../../../../../../../../../core/dto/request-dto/schedule-leactures/ScheduleLectureUpdateRequest';
import {ScheduleLectureStatus} from '../../../../../../../../../../../../../core/enums/ScheduleLectureStatus';
import {SelectComponent, SelectOption} from '../../../../../../../../../../../../../shared/ui/select/select.component';
import {CheckboxComponent} from '../../../../../../../../../../../../../shared/ui/checkbox/checkbox.component';
import {
  DialogLayoutComponent
} from '../../../../../../../../../../../../../core/layouts/dialog-layout/dialog-layout.component';
import {InputComponent} from '../../../../../../../../../../../../../shared/ui/input/input.component';
import {Pencil} from 'lucide-angular';

@Component({
  selector: 'app-schedule-lec-update',
  imports: [
    CheckboxComponent,
    DialogLayoutComponent,
    InputComponent,
    ReactiveFormsModule,
    SelectComponent
  ],
  templateUrl: './schedule-lec-update.component.html',
  styleUrl: './schedule-lec-update.component.css'
})
export class ScheduleLecUpdateComponent {

  protected form!:FormGroup;
  protected loading:boolean = false;
  protected readonly statusOptions:SelectOption[] = [];

  private readonly originalScheduleLecture!:ScheduleLectureResponse;

  private readonly dialogRef:MatDialogRef<ScheduleLecUpdateComponent> = inject(MatDialogRef<ScheduleLecUpdateComponent>);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly formBuilder:FormBuilder = inject(FormBuilder);
  private readonly formErrorHandler:FormErrorHandler = inject(FormErrorHandler);
  private readonly scheduleLectureService:ScheduleLectureService = inject(ScheduleLectureService);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data:ScheduleLectureResponse) {
    this.originalScheduleLecture = data;
    const statuses:ScheduleLectureStatus[] = Object.values(ScheduleLectureStatus);
    for (let status of statuses){
      this.statusOptions.push({
        label:status.toLowerCase(),
        value:status
      })
    }
    this.form = this.initializeForm();
  }

  private initializeForm():FormGroup{
    return this.formBuilder.group({
      topic: [this.originalScheduleLecture.topic,Validators.required],
      chapterId: [this.originalScheduleLecture.chapterId,Validators.required],
      startDate: [this.originalScheduleLecture.startDate, Validators.required],
      startTime: [this.originalScheduleLecture.startTime,Validators.required],
      endTime:[this.originalScheduleLecture.endTime,Validators.required],
      lateAttendance:[this.originalScheduleLecture.lateAttendance ? true : null],
      meetingUrl:[this.originalScheduleLecture.meetingUrl,Validators.required],
      status:[this.originalScheduleLecture.status,Validators.required]
    })
  }

  onCancel():void{
    this.dialogRef.close();
  }

  onReset():void{
    this.form = this.initializeForm();
  }

  onSubmit():void{
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const request:ScheduleLectureUpdateRequest = this.form.value;
    request.lateAttendance = this.form.get('lateAttendance')?.value != null;

    this.triggerLoading();
    this.scheduleLectureService.updateScheduleLecture(this.originalScheduleLecture.id,request).subscribe({
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

  protected readonly Pencil = Pencil;
}
