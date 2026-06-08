import {Component, inject, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Batch} from '../../../../core/models/batch';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {BatchStatus} from '../../enums/batch-status';
import {BatchEnrollmentStatus} from '../../enums/batch-enrollment-status';
import {BatchService} from '../../../../core/services/batch/batch.service';
import {DialogLayoutComponent} from '../../../../core/layouts/dialog-layout/dialog-layout.component';
import {SquarePen} from 'lucide-angular';

@Component({
  selector: 'app-update-batch-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DialogLayoutComponent
  ],
  templateUrl: './update-batch-dialog.component.html',
  styleUrl: './update-batch-dialog.component.css'
})
export class UpdateBatchDialogComponent implements OnInit{

  private readonly originalBatch!:Batch;
  protected isLoading: boolean = false;
  protected readonly batchStatuses = Object.values(BatchStatus);
  protected readonly batchEnrollmentStatuses = Object.values(BatchEnrollmentStatus);
  protected form!:FormGroup;

  private readonly formBuilder = inject(FormBuilder);
  private readonly batchService = inject(BatchService);

  constructor(private readonly dialogRef:MatDialogRef<UpdateBatchDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:{batch:Batch,courseId:number}) {
    this.originalBatch = data.batch;
    this.form = this.initializeForm(data.batch);
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

  private initializeForm(batch:Batch):FormGroup{
    return this.formBuilder.group({
      name:[batch.name, Validators.required],
      courseId:[batch.courseId,Validators.required],
      start_date:[batch.start_date, Validators.required],
      start_time:[batch.start_time, Validators.required],
      is_seat_limited:[batch.is_seat_limited],
      max_seat_limit:[batch.max_seat_limit],
      batch_status:[batch.batch_status,Validators.required],
      enrollment_status:[batch.enrollment_status,Validators.required]
    })
  }

  onCancel(){
    this.dialogRef.close();
  }

  onReset(){
    this.form.reset();
    this.form = this.initializeForm(this.originalBatch);
  }

  onSubmit(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.triggerLoading();

    const updateBatch = this.form.value;

    this.batchService.updateBatch(this.originalBatch.id,updateBatch).subscribe({
      next: res => {
        this.dialogRef.close(res.data);
      },
      error: err => {
        const errors = err.error?.errors;

        if (errors.length > 0) {
          errors.forEach((e: any) => {
            this.form.get(e.field)?.setErrors({
              server: e.message
            });
          });
          this.triggerLoading();
        }else{
          this.triggerLoading(); // trigger loading to enable form before setting error because form.enable will clear out all form errors
          this.form.setErrors({server: err.error.message});
        }
      }
    });

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
    const originalStartDate = new Date(this.originalBatch.start_date);
    const valid= startDate >=  new Date() || originalStartDate === startDate;
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

  protected readonly SquarePen = SquarePen;
}
