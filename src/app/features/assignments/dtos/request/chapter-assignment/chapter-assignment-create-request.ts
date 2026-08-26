import {GradingRangeCreateRequest} from '@features/assignments/dtos/request/grading-range/grading-range-create-request';

export class ChapterAssignmentCreateRequest {
  chapterId!: number;
  topic!: string;
  description!: string;
  totalMarks!: number;
  availableOn!: string | Date;
  dueDate!: string | Date;
  lateSubmission!: boolean;
  resubmission!: boolean;
  maxAttempts!: number;
  gradingRanges!: GradingRangeCreateRequest[];
}
