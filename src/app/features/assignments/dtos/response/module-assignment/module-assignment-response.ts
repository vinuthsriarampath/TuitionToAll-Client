export class ModuleAssignmentResponse {
  id!: number;
  assignmentId!: number;
  moduleId!: number;
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
