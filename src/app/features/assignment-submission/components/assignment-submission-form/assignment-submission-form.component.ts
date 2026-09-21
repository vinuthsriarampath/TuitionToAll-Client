import {Component, inject, input, OnInit} from '@angular/core';
import {CardShellComponent, FileInputComponent} from '@shared/ui';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {
  AssignmentSubmissionService
} from '@features/assignment-submission/services/assignment-submission-service/assignment-submission.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {
  AssignmentSubmissionEligibilityResponse
} from '@features/assignment-submission/dtos/responses/assignment-submission-eligibility-response';
import {SubmissionEligibilityReason} from '@features/assignment-submission/enums/submission-eligibility-reason';
import {FormErrorHandler} from '@shared/utils/helpers/FormErrorHandler';

@Component({
  selector: 'app-assignment-submission-form',
  imports: [
    CardShellComponent,
    FileInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './assignment-submission-form.component.html',
  styleUrl: './assignment-submission-form.component.css'
})
export class AssignmentSubmissionFormComponent implements OnInit{
  assignmentId = input.required<number>();

  protected form!: FormGroup;
  protected loading: boolean = false;

  protected eligibilityResponse!:AssignmentSubmissionEligibilityResponse;

  private readonly submissionService = inject(AssignmentSubmissionService);
  private readonly alertService = inject(AlertService);
  private readonly fb = inject(FormBuilder);
  private readonly formErrorHandler = inject(FormErrorHandler);

  ngOnInit(): void {
      this.checkEligibility();
  }

  private initializeForm(){
    this.form = this.fb.group({
      file: []
    })
  }

  private checkEligibility(): void {
    this.loading = true
    this.submissionService.checkEligibility(this.assignmentId()).subscribe({
      next: res =>{
        if(res.data){
          this.eligibilityResponse = res.data;
          if(res.data.canSubmit) this.initializeForm();
        }
        this.loading=false;
      },
      error: err => {
        this.alertService.triggerErrorAlert(err.error.message ?? "An error occurred while checking eligibility");
        this.loading=false;
      }
    })
  }

  protected onSubmit():void{
    if(this.form.invalid){
      return;
    }

    let file:File | null = this.form.get('file')?.value ?? null;
    if (file === null || !(file instanceof File)) {
      this.alertService.triggerErrorAlert("File is missing or invalid!");
      return;
    }

    this.loading = true;
    this.form.disable({emitEvent: false});

    this.submissionService.submit(this.assignmentId(), file).subscribe({
      next: res => {
        if(res.data){
          this.alertService.triggerSuccessAlert("Assignment submitted successfully!");
          this.loading = false;
          this.form.enable({emitEvent: false});
          this.form.reset();
          this.checkEligibility();
        }
      },
      error: err => {
        this.formErrorHandler.normalizeErrors(err);
        this.formErrorHandler.handle(err,this.form,()=>{
          this.loading=false;
          this.form.enable({emitEvent: false}
          )}
        );
      }
    })
  }

  protected onReset() {
    this.initializeForm();
  }

  protected readonly SubmissionEligibilityReason = SubmissionEligibilityReason;
}
