import {ApplicationStatus} from '@features/applications/enums/application-status';


export class TeacherApplicationResponse {
  applicationId!: number;
  vacancyId!: number;
  vacancyTitle!: string;
  instituteId!: number;
  instituteName!: string;
  instituteUserSlug!: string;
  applicationStatus!: ApplicationStatus;
  appliedDate!: string;
  lastModifiedDate!: string;
}
