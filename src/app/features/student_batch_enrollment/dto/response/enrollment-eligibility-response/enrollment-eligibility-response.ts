import {EnrollmentEligibilityReason} from '@features/student_batch_enrollment/enums/EnrollmentEligibilityReason';

export class EnrollmentEligibilityResponse {
  canEnroll!: boolean;
  reason!: EnrollmentEligibilityReason;
}
