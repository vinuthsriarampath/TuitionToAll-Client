import {TeacherVacancyStatus} from '../../../enums/teacher-vacancy-status';

export class TeacherVacancyUpdateRequest{
  title!: string;
  requiredExperienceYears!: number;
  jobDescription!: string;
  status!: TeacherVacancyStatus;
  vacancyClosingDate!: string;
}
