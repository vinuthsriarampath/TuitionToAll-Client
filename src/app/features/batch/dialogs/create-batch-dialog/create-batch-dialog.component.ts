import {Component, inject, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BatchStatus} from '../../enums/batch-status';
import {BatchEnrollmentStatus} from '../../enums/batch-enrollment-status';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {BatchService} from '../../../../core/services/batch/batch.service';
import {Batch} from '../../../../core/models/batch';
import {
  DialogLayoutComponent
} from '../../../../core/layouts/dialog-layout/dialog-layout.component';
import {Plus} from 'lucide-angular';

@Component({
  selector: 'app-create-batch-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DialogLayoutComponent
  ],
  templateUrl: './create-batch-dialog.component.html',
  styleUrl: './create-batch-dialog.component.css'
})
export class CreateBatchDialogComponent implements OnInit{

  form!: FormGroup;
  private readonly formBuilder = inject(FormBuilder);
  protected isLoading: boolean = false;

  private readonly courseId:number;
  private readonly batchService:BatchService = inject(BatchService);

  protected readonly batchStatuses = Object.values(BatchStatus);
  protected readonly batchEnrollmentStatuses = Object.values(BatchEnrollmentStatus);

  constructor(public dialogRef : MatDialogRef<CreateBatchDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: number) {
    this.courseId = data;
    this.form = this.buildDefaultForm();
  }

  ngOnInit() {
    this.form.get('is_seat_limited')?.valueChanges.subscribe(isLimited => {
      const control = this.form.get('max_seat_limit');

      if (isLimited) {
        control?.setValidators([Validators.required, Validators.min(1)]);
      } else {
        control?.setValidators([Validators.min(0)]);
        control?.setValue(0);
      }

      control?.updateValueAndValidity();
    });
  }

  onCancel(){
    this.dialogRef.close();
  }

  protected onReset():void{
    this.form.reset();
    this.form= this.buildDefaultForm();
  }

  protected onSubmit():void{
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.triggerLoading();


    this.batchService.createBatch(this.form.value).subscribe({
      next: res => {
        this.dialogRef.close(res.data as Batch);
        this.triggerLoading();
      },
      error: err => {
        const errors = err.error?.errors;

        if (errors) {
          errors.forEach((e: any) => {
            this.form.get(e.field)?.setErrors({
              server: e.message
            });
          });
          this.triggerLoading();
        }else{
          this.triggerLoading();
          this.form.setErrors({server: err.error.message()});
        }
      }
    });
  }

  buildDefaultForm():FormGroup{
    return this.formBuilder.group({
      name:['', Validators.required],
      courseId:[this.courseId,Validators.required],
      start_date:[new Date().toISOString().split('T')[0], Validators.required],
      start_time:['09:00:00', Validators.required],
      is_seat_limited:[false],
      max_seat_limit:[0],
      batch_status:[BatchStatus.PREPARATION,Validators.required],
      enrollment_status:[BatchEnrollmentStatus.OPEN,Validators.required]
    })
  }

  protected validateSeatsLimit(){
    const isLimited = this.form.value.is_seat_limited;
    const max = this.form.value.max_seat_limit;

    if (isLimited && max <= 0) {
      this.form.get('max_seat_limit')?.setErrors({
        custom: 'Must be > 0 when limited'
      });
    }
  }

  protected validateStartDate(){
    const startDate = new Date(this.form.value.start_date);
    const valid= startDate >=  new Date();
    if (!valid){
      this.form.get('start_date')?.setErrors({
        custom: 'Start date cannot be in the past'
      });
    }
  }

  protected validateStatus(){
    const batch = this.form.value.batch_status;
    const enroll = this.form.value.enrollment_status;

    if (batch === 'COMPLETED' && enroll !== 'CLOSED') {
      this.form.get('enrollment_status')?.setErrors({
        custom: 'Must be CLOSED if batch is COMPLETED'
      });
    }
  }

  private triggerLoading(){
    this.isLoading = !this.isLoading;

    if (this.isLoading) {
      this.form.disable({emitEvent:false});   // 🔥 disable all fields
    } else {
      this.form.enable();    // 🔥 enable all fields
    }
  }

  protected readonly Plus = Plus;
}
