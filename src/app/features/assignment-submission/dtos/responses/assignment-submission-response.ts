import {AssignmentSubmitStatus} from '@features/assignment-submission/enums/assignment-submit-status';

export class AssignmentSubmissionResponse {
  submissionId!: number;
  studentId!: number;
  assignmentId!: number;
  url!: string;
  grade!: string;
  status!: AssignmentSubmitStatus;
  marksGained!: number;
  attemptNo!: number;
  submittedAt!: string;
  lastModifiedDate!: string;
}
