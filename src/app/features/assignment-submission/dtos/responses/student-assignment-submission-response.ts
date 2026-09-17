import {AssignmentSubmitStatus} from '@features/assignment-submission/enums/assignment-submit-status';

export class StudentAssignmentSubmissionResponse {
  submissionId!: number;
  assignmentId!: number;
  url!: string;
  grade!: string;
  marksGained!: number;
  status!: AssignmentSubmitStatus;
  attemptNo!: number;
  submittedAt!: string;
  lastModifiedDate!: string;
}
