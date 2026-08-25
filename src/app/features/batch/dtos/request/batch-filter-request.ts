import {BatchEnrollmentStatus} from '@features/batch/enums/batch-enrollment-status';
import {BatchStatus} from '@features/batch/enums/batch-status';

export class BatchFilterRequest {
  id?: number;
  batchName?: string;
  courseId?: number;
  instituteId?: number;
  status?: BatchStatus;
  enrollmentStatus?: BatchEnrollmentStatus;
}
