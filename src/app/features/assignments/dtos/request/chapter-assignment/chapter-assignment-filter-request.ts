export class ChapterAssignmentFilterRequest {
  assignmentId!: number;
  topic!: string;
  resubmission!: boolean;
  lateSubmission!: boolean;
  totalMarks!: number;
  maxAttempts!: number;
  availableOn!: string | Date;
  dueDate!: string | Date;
  createdDate!: string | Date;
  lastModifiedDate!: string | Date;
}
