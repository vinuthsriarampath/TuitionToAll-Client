import {Assignment} from '@features/assignments/dtos/response/assignment';

export class ModuleAssignmentResponse implements Assignment{
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
  resubmission!: boolean;
  maxAttempts!: number;
  createdDate!: string | Date;
  lastModifiedDate!: string | Date;
}
