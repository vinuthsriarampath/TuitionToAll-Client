import {Component, Inject, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  AssignmentSubmissionDetailedResponse
} from '@features/assignment-submission/dtos/responses/assignment-submission-detailed-response';
import {DialogLayoutComponent} from '@core/layouts';
import {FileUser} from 'lucide-angular';
import {DatePipe} from '@angular/common';
import {environment} from '@env/environment.development';
import {
  AssignmentSubmissionStatusBadgeComponent
} from '@features/assignment-submission/components/assignment-submission-status-badge/assignment-submission-status-badge.component';
import {CardShellComponent} from '@shared/ui';
import {GradingRageResponse} from '@features/assignments/dtos/response/grading-range/grading-range-response';
import {
  GradingSubmissionComponentComponent
} from '@features/grading/components/grading-submission-component/grading-submission-component.component';
import {SubmissionGradedResponse} from '@features/grading/dtos/responses/submission-graded-response';
import {AssignmentSubmitStatus} from '@features/assignment-submission/enums/assignment-submit-status';
import {GradingEligibilityResponse} from '@features/grading/dtos/responses/grading-eligibility-response';
import {GradingEligibilityReason} from '@features/grading/enums/grading-eligibility-reason';
import {GradingService} from '@features/grading/services/grading-service/grading.service';
import {AlertService} from '@core/services/alerts/alert.service';

export interface SubmissionViewDialogData {
  submissionData: AssignmentSubmissionDetailedResponse,
  gradingRanges: GradingRageResponse[],
  totalMarks: number,
}

@Component({
  selector: 'app-assignment-submission-view',
  imports: [
    DialogLayoutComponent,
    DatePipe,
    AssignmentSubmissionStatusBadgeComponent,
    CardShellComponent,
    GradingSubmissionComponentComponent
  ],
  templateUrl: './assignment-submission-view.component.html',
  styleUrl: './assignment-submission-view.component.css'
})
export class AssignmentSubmissionViewComponent implements OnInit{

  protected checkingGradingEligibility:boolean = false;

  protected readonly submissionData!: AssignmentSubmissionDetailedResponse;
  protected readonly gradingRanges!: GradingRageResponse[];
  protected readonly totalMarks!: number;

  protected gradingEligibility!: GradingEligibilityResponse;

  private readonly dialogRef = inject(MatDialogRef<AssignmentSubmissionViewComponent>);
  private readonly gradingService = inject(GradingService);
  private readonly alertService = inject(AlertService);

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data: SubmissionViewDialogData) {
    this.submissionData = data.submissionData;
    this.gradingRanges = data.gradingRanges;
    this.totalMarks = data.totalMarks;
  }

  ngOnInit(): void {
        this.checkGradingEligibility();
    }

  protected closeDialog = (): void => {
    this.dialogRef.close(false);
  }

  protected onUpdate = (res: SubmissionGradedResponse) =>{
    if (res){
      this.submissionData.marksGained = res.marksGained;
      this.submissionData.grade = res.grade;
      this.submissionData.status = AssignmentSubmitStatus.GRADED;

      this.gradingEligibility = {
        canGrade : false,
        reason : GradingEligibilityReason.ALREADY_GRADED
      }
    }
  }

  private checkGradingEligibility(): void {
    this.checkingGradingEligibility = true;
    this.gradingService.checkGradingEligibility(this.submissionData.submissionId).subscribe({
      next: res => {
        if(res.data){
          this.gradingEligibility = res.data
        }
        this.checkingGradingEligibility = false;
      },
      error: err => {
        this.alertService.triggerErrorAlert(err.error.message || 'An unknown error occurred');
        this.gradingEligibility = {
          canGrade : false,
          reason : GradingEligibilityReason.UNKNOWN_ERROR
        }
        this.checkingGradingEligibility = false;
      }
    });
  }


  protected readonly FileUser = FileUser;
  protected readonly environment = environment;
  protected readonly GradingEligibilityReason = GradingEligibilityReason;
}
