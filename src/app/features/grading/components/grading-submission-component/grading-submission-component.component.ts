import {Component, inject, input, OnInit, output} from '@angular/core';
import {GradingRageResponse} from '@features/assignments/dtos/response/grading-range/grading-range-response';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {GradingService} from '@features/grading/services/grading-service/grading.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {GradingSubmissionRequest} from '@features/grading/dtos/requests/grading-submission-request';
import {CardShellComponent, InputComponent} from '@shared/ui';
import {FormErrorHandler} from '@shared/utils/helpers/FormErrorHandler';
import {SubmissionGradedResponse} from '@features/grading/dtos/responses/submission-graded-response';

@Component({
  selector: 'app-grading-submission-component',
  imports: [
    CardShellComponent,
    ReactiveFormsModule,
    InputComponent
  ],
  templateUrl: './grading-submission-component.component.html',
  styleUrl: './grading-submission-component.component.css'
})
export class GradingSubmissionComponentComponent implements OnInit{
  gradingRanges = input.required<GradingRageResponse[]>();
  totalMarks = input<number>(100);
  submissionId = input.required<number>();
  onUpdate = output<SubmissionGradedResponse>();

  protected form!:FormGroup;
  protected loading: boolean = false;

  private readonly fb = inject(FormBuilder);
  private readonly gradingService = inject(GradingService);
  private readonly alertService = inject(AlertService);
  private readonly formErrorHandler = inject(FormErrorHandler);

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm():void{
    this.form = this.fb.group({
      marksGained: [0, [Validators.required, Validators.min(0), Validators.max(this.totalMarks()), this.validateMarksGained]],
    })
  }

  protected onSubmit():void{
    if(this.form.invalid){
      return;
    }

    this.loading = true;
    this.form.disable({emitEvent: false});
    const request = new GradingSubmissionRequest(this.form.get('marksGained')?.value);
    this.gradingService.gradeSubmission(this.submissionId(), request).subscribe({
      next: res => {
        if(res.data){
          this.alertService.triggerSuccessAlert(res.message);
          this.onUpdate.emit(res.data);
        }
        this.loading = false;
        this.form.reset();
        this.form.enable();
      },
      error: err => {
        this.alertService.triggerErrorAlert(err.error?.error || 'An unknown error occurred');
        this.formErrorHandler.normalizeErrors(err)
        this.formErrorHandler.handle(err, this.form, () => {
          this.loading = false
          this.form.enable();
        });
      }
    })

  }

  protected onReset():void{
    this.initializeForm();
  }

  private validateMarksGained():ValidatorFn{
    return (control:AbstractControl): null | ValidationErrors => {
      if (!control.value) return null;
      if(this.gradingRanges().length > 0) throw new Error('Grading ranges are not defined.');
      for (const range of this.gradingRanges()) {
        if (control.value >= range.minMarks && control.value <= range.maxMarks) {
          return null;
        }
      }
      return { marksGained: { message: 'Marks gained must be within the defined grading ranges.' } };
    }
  }

}
