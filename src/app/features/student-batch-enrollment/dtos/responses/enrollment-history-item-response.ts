import {StudentBatchEnrollmentStatus} from '@features/student-batch-enrollment/enums/student-batch-enrollment-status';
import {BatchStatus} from '@features/batch/enums/batch-status';

export class EnrollmentHistoryItemResponse {

  enrollmentId!: number;
  enrollmentStatus!: StudentBatchEnrollmentStatus;
  enrollmentDate!: string;

  batchId!: number;
  batchName!: string;
  batchStatus!: BatchStatus;
  batchStartDate!: string;

}
