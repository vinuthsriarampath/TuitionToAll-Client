import {GradingRangeUpdateRequest} from '@features/assignments/dtos/request/grading-range/grading-range-update-request';

export class AssignmentUpdateRequest {
  topic!: string;
  description!: string;
  totalMarks!: number;
  availableOn!: string | Date;
  dueDate!: string | Date;
  lateSubmission!: boolean;
  resubmission!: boolean;
  maxAttempts!: number;
  gradingRanges!: GradingRangeUpdateRequest[];
}
