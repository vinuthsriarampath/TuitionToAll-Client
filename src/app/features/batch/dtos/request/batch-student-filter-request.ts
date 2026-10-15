import {StudentBatchEnrollmentStatus} from '@features/student-batch-enrollment/enums/student-batch-enrollment-status';

export class BatchStudentFilterRequest {
  name?:string;
  email?:string;
  enrolledDate?:string;
  enrollmentStatus?:StudentBatchEnrollmentStatus
}
