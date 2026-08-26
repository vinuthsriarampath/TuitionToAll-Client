import {BatchEnrollmentStatus} from '@features/batch/enums/batch-enrollment-status';
import {BatchStatus} from '@features/batch/enums/batch-status';

export class BatchDetailedResponse {
  id!: number;
  name!: string;
  courseId!: number;
  courseTitle!: string;
  totalEnrollments!: number;
  isSeatLimited!: boolean;
  maxSeatsLimit!: number;
  batchStatus!: BatchStatus;
  enrollmentStatus!: BatchEnrollmentStatus;
  startDate!: string;
  startTime!: string;
  createdDate!: string;
  lastModifiedDate!: string;
}
