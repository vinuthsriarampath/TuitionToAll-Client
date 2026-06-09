import {BatchStatus} from '@features/batch/enums/batch-status';
import {BatchEnrollmentStatus} from '@features/batch/enums/batch-enrollment-status';

export class BatchUpdateRequest {
  courseId!: number;
  name!: string;
  is_seat_limited!: boolean;
  max_seat_limit!: number;
  start_date!: string; // ISO format: YYYY-MM-DD
  start_time!: string; // ISO format: HH:mm:ss
  batch_status!: BatchStatus;
  enrollment_status!: BatchEnrollmentStatus;
}
