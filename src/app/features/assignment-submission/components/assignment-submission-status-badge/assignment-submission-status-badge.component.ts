import {Component, input} from '@angular/core';
import {AssignmentSubmitStatus} from '@features/assignment-submission/enums/assignment-submit-status';
import {BadgeComponent} from '@shared/ui';
import {LowerCasePipe, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-assignment-submission-status-badge',
  imports: [
    BadgeComponent,
    TitleCasePipe
  ],
  templateUrl: './assignment-submission-status-badge.component.html',
  styleUrl: './assignment-submission-status-badge.component.css'
})
export class AssignmentSubmissionStatusBadgeComponent {
  status = input.required<AssignmentSubmitStatus>();

  get getVariant(){
    switch(this.status()){
      case AssignmentSubmitStatus.SUBMITTED:
        return 'primary';
      case AssignmentSubmitStatus.LATE_SUBMITTED:
        return 'danger';
      case AssignmentSubmitStatus.GRADED:
        return 'success';
      default:
        return 'secondary';
    }
  }
}
