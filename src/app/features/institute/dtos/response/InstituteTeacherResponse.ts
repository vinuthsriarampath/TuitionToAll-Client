import {InstituteTeacherStatus} from '../../enums/InstituteTeacherStatus';
import {TeacherUserResponse} from '../../../profile/dtos/response/teacher-user-response';

export class InstituteTeacherResponse {
  id!:number;
  instituteId!:number;
  status!:InstituteTeacherStatus;
  teacher!:TeacherUserResponse;
  joinedDate!:Date;
  last_modified_date!:Date;
}
