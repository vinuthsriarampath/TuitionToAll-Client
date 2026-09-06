import {BatchStatus} from '@features/batch/enums/batch-status';

export class StudentBatchResponse {
  id!: number;
  courseId!: number;
  name!: string;
  startDate!: string;
  startTime!: string;
  status!: BatchStatus;
}
