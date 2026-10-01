import {ApplicationStatus} from '@features/applications/enums/application-status';

export class TeacherApplicationFilterRequest {
  applicationId!: number;
  vacancyId!: number;
  vacancyTitle!: string;
  instituteId!: number;
  instituteName!: string;
  status!: ApplicationStatus;
  appliedDate!: string;
}
