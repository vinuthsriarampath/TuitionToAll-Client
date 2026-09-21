import {GradingEligibilityReason} from '@features/grading/enums/grading-eligibility-reason';

export class GradingEligibilityResponse {
  canGrade!: boolean;
  reason!: GradingEligibilityReason;
}
