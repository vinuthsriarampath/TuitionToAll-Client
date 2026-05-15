import {BatchStatus} from '../../../enums/batch-status';
import {BatchEnrollmentStatus} from '../../../enums/batch-enrollment-status';

export class BatchBasicResponse{
  id!:number;
  courseId!:number;
  name!:string;
  status!:BatchStatus;
  enrollmentStatus!:BatchEnrollmentStatus;
  createdDate!:string;
  lastModifiedDate!:string;
}
