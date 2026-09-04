import {BatchStatus} from '@features/batch/enums/batch-status';
import {StudentBatchEnrollmentStatus} from '@features/student-batch-enrollment/enums/student-batch-enrollment-status';

export class CurrentEnrollmentResponse{
  enrollmentId!: number;
  enrollmentStatus!: StudentBatchEnrollmentStatus;
  enrollmentDate!: string;

  batchId!: number;
  batchName!: string;
  batchStatus!: BatchStatus;
  startDate!: string;
}
