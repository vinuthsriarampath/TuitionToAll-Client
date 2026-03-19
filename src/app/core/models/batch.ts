import {BatchStatus} from '../enums/batch-status';
import {BatchEnrollmentStatus} from '../enums/batch-enrollment-status';

export class Batch {
  id!: number;
  courseId!: number;
  name!: string;
  is_seat_limited!: boolean;
  max_seat_limit!: number;
  start_date!: Date;
  start_time!: string;
  batch_status!: BatchStatus;
  enrollment_status!: BatchEnrollmentStatus;
  created_date!: Date;
  last_modified_date!: Date;
}
