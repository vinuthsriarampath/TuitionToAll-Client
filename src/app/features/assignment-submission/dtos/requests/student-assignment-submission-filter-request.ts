import {AssignmentSubmitStatus} from '@features/assignment-submission/enums/assignment-submit-status';

export class StudentAssignmentSubmissionFilterRequest {
  submissionId?: number;
  status?: AssignmentSubmitStatus;
  grade?: string;
  attemptNo?: number;
  marksGained?: number;
  minMarksGained?: number;
  maxMarksGained?: number;
}
