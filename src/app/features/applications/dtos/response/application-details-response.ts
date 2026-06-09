import {ApplicationStatus} from '../../enums/application-status';
import {TeacherUserResponse} from '../../../profile/dtos/response/teacher-user-response';

export class ApplicationDetailsResponse {
  id!:number;
  teacherVacancyId!:number;
  status!:ApplicationStatus;
  appliedDate!:Date;
  last_modified_date!:Date;

  teacher!:TeacherUserResponse;
}
