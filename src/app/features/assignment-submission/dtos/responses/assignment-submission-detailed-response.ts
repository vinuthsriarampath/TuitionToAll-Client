import {AssignmentSubmitStatus} from '@features/assignment-submission/enums/assignment-submit-status';

export class AssignmentSubmissionDetailedResponse {
  submissionId!: number;
  studentId!: number;
  studentName!: string;
  assignmentId!: number;
  url!: string;
  grade!: string;
  marksGained!: number;
  status!: AssignmentSubmitStatus;
  attemptNo!: number;
  submittedAt!: string;
  lastModifiedDate!: string;
}
