import {Assignment} from '@features/assignments/dtos/response/assignment';

export class ChapterAssignmentResponse implements Assignment{
  id!: number;
  assignmentId!: number;
  chapterId!: number;
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
}
