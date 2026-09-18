import {Component, Inject, inject} from '@angular/core';
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

@Component({
  selector: 'app-assignment-submission-view',
  imports: [
    DialogLayoutComponent,
    DatePipe,
    AssignmentSubmissionStatusBadgeComponent,
    CardShellComponent
  ],
  templateUrl: './assignment-submission-view.component.html',
  styleUrl: './assignment-submission-view.component.css'
})
export class AssignmentSubmissionViewComponent {

  protected readonly submissionData!: AssignmentSubmissionDetailedResponse;

  private readonly dialogRef = inject(MatDialogRef<AssignmentSubmissionViewComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) data: AssignmentSubmissionDetailedResponse) {
    this.submissionData = data;
  }

  protected closeDialog = (): void => {
    this.dialogRef.close(false);
  }

  protected readonly FileUser = FileUser;
  protected readonly environment = environment;
}
