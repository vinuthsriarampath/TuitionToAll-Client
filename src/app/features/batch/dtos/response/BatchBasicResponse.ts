import {BatchStatus} from '@features/batch/enums/batch-status';
import {BatchEnrollmentStatus} from '@features/batch/enums/batch-enrollment-status';

export class BatchBasicResponse{
  id!:number;
  courseId!:number;
  name!:string;
  status!:BatchStatus;
  enrollmentStatus!:BatchEnrollmentStatus;
  createdDate!:string;
  lastModifiedDate!:string;
}
