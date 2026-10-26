import {ApplicationStatus} from '@features/applications/enums/application-status';

export class ApplicationFilterRequest{
  status?: ApplicationStatus;
  teacherName?: string;
}
