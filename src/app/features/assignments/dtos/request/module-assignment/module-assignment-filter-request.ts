export class ModuleAssignmentFilterRequest {
  assignmentId!: number;
  topic!: string;
  reSubmission!: boolean;
  lateSubmission!: boolean;
  totalMarks!: number;
  maxAttempts!: number;
  availableOn!: string | Date;
  dueDate!: string | Date;
  createdDate!: string | Date;
  lastModifiedDate!: string | Date;
}
