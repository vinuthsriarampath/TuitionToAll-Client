import {ReviewEligibilityReason} from '@features/review/enums/review-eligibility-reason';

export class ReviewEligibilityResponse {
  canReview!: boolean;
  reason!: ReviewEligibilityReason;
}
