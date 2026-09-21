import {AssignmentSubmitStatus} from '@features/assignment-submission/enums/assignment-submit-status';

export class AssignmentSubmissionFilterRequest {
  submissionId?: number;
  status?: AssignmentSubmitStatus;
  grade?: string;
  attemptNo?: number;
  marksGained?: number;
  minMarksGained?: number;
  maxMarksGained?: number;
  studentId?: number;
  studentName?: string;
}
