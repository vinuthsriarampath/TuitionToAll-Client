import {EnrollmentEligibilityReason} from '@features/student-batch-enrollment/enums/EnrollmentEligibilityReason';

export class EnrollmentEligibilityResponse {
  canEnroll!: boolean;
  reason!: EnrollmentEligibilityReason;
}
