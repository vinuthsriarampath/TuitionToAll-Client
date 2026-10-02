import {AssignmentSubmitStatus} from '@features/assignment-submission/enums/assignment-submit-status';

export class NonGradedSubmissionResponse {
  submissionId!: number;
  studentId!: number;
  studentName!: string;
  assignmentId!: number;
  status!: AssignmentSubmitStatus;
  attemptNo!: number;
  submittedAt!: string;
}
