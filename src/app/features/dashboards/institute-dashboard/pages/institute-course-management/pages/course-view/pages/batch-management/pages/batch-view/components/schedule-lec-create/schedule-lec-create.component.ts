import {Component, Inject, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AlertService} from '../../../../../../../../../../../../../core/services/alerts/alert.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormErrorHandler} from '../../../../../../../../../../../../../shared/utils/helpers/FormErrorHandler';
import {
  ScheduleLectureService
} from '../../../../../../../../../../../../../core/services/schedule-lecture/schedule-lecture.service';
import {getDate, getDateTime, getTime} from '../../../../../../../../../../../../../shared/utils/helpers/date-helper';
import {
  ScheduleLectureCreateStatus
} from '../../../../../../../../../../../../../core/dto/request-dto/schedule-leactures/enums/ScheduleLectureStatus';
import {
  ScheduleLectureCreateRequest
} from '../../../../../../../../../../../../../core/dto/request-dto/schedule-leactures/ScheduleLectureCreateRequest';
import {
  DialogLayoutComponent
} from '../../../../../../../../../../../../../core/layouts/dialog-layout/dialog-layout.component';
import {Paperclip} from 'lucide-angular';
import {InputComponent} from '../../../../../../../../../../../../../shared/ui/input/input.component';
import {CheckboxComponent} from '../../../../../../../../../../../../../shared/ui/checkbox/checkbox.component';

@Component({
  selector: 'app-schedule-lec-create',
  imports: [
    DialogLayoutComponent,
    ReactiveFormsModule,
    InputComponent,
    CheckboxComponent
  ],
  templateUrl: './schedule-lec-create.component.html',
  styleUrl: './schedule-lec-create.component.css'
})
export class ScheduleLecCreateComponent {

  protected form!:FormGroup;
  protected loading:boolean = false;

  private readonly chapterId!:number;

  private readonly dialogRef:MatDialogRef<ScheduleLecCreateComponent> = inject(MatDialogRef<ScheduleLecCreateComponent>);
  private readonly alertService:AlertService = inject(AlertService);
  private readonly formBuilder:FormBuilder = inject(FormBuilder);
  private readonly formErrorHandler:FormErrorHandler = inject(FormErrorHandler);
  private readonly scheduleLectureService:ScheduleLectureService = inject(ScheduleLectureService);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data:number) {
    this.chapterId = data;
    this.form = this.initializeForm();
  }

  private initializeForm():FormGroup{
    return this.formBuilder.group({
      topic: ['',Validators.required],
      chapterId: [this.chapterId,Validators.required],
      startDate: [getDate(0,0,1), Validators.required],
      startTime: [getTime(1,0),Validators.required],
      endTime:[getTime(2,0),Validators.required],
      lateAttendance:[true],
      meetingUrl:['',Validators.required],
      status:[ScheduleLectureCreateStatus.DRAFT,Validators.required]
    })
  }

  onCancel():void{
    this.dialogRef.close();
  }

  onReset():void{
    this.form = this.initializeForm();
  }

  onDraftSave():void{
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const request:ScheduleLectureCreateRequest = this.form.value;
    request.lateAttendance = this.form.get('lateAttendance')?.value != null;

    this.saveScheduleLecture(request);
  }

  onSubmit():void{
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const request:ScheduleLectureCreateRequest = this.form.value;
    request.lateAttendance = this.form.get('lateAttendance')?.value != null;
    request.status = ScheduleLectureCreateStatus.SCHEDULED;

    this.saveScheduleLecture(request);
  }


  saveScheduleLecture(request:ScheduleLectureCreateRequest):void{
    this.triggerLoading();
    this.scheduleLectureService.scheduleLecture(request).subscribe({
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

  protected readonly Paperclip = Paperclip;
}
