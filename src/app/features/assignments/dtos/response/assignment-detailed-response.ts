import {GradingRageResponse} from '@features/assignments/dtos/response/grading-range/grading-range-response';

export class AssignmentDetailedResponse {
  id!: number;
  topic!: string;
  description!: string;
  fileName!: string;
  totalMarks!: number;
  availableOn!: string | Date;
  dueDate!: string | Date;
  lateSubmission!: boolean;
  reSubmission!: boolean;
  maxAttempts!: number;
  createdDate!: string | Date;
  lastModifiedDate!: string | Date;
  gradingRangers!: GradingRageResponse[];
}
