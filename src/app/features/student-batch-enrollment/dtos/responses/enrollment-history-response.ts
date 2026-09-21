import {
  EnrollmentHistoryItemResponse
} from '@features/student-batch-enrollment/dtos/responses/enrollment-history-item-response';

export class EnrollmentHistoryResponse {

  courseId!: number;
  courseTitle!: string;
  enrollments!: EnrollmentHistoryItemResponse[];

}
