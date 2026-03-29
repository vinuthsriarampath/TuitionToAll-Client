import {TeacherVacancyStatus} from '../enums/teacher-vacancy-status';

export class TeacherVacancy {
  id!: number;
  title!: string;
  requiredExperienceYears!: number;
  jobDescription!: string;
  status!: TeacherVacancyStatus;
  vacancyClosingDate!: string;
  instituteId!: number;
}
