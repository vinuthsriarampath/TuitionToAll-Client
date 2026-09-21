import {SubmissionEligibilityReason} from '@features/assignment-submission/enums/submission-eligibility-reason';

export class AssignmentSubmissionEligibilityResponse {
  canSubmit!: boolean;
  reason!: SubmissionEligibilityReason;
}
