import {FeedbackEligibilityReason} from '@features/feedback/enums/feedback-eligibility-reason';

export class FeedbackEligibilityResponse {
  canFeedback!: boolean;
  reason!: FeedbackEligibilityReason;
}
