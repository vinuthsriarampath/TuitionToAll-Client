import {ApplicationStatus} from '../enums/application-status';

export class Application {
  id!: number;
  teacherId!: number;
  teacherVacancyId!: number;
  status!: ApplicationStatus;
  appliedDate!: Date;
  lastModifiedDate!: Date;
}
