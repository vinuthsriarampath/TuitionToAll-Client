import {TeacherVacancyStatus} from '@features/teacher-vacancy/enums/teacher-vacancy-status';

export class TeacherVacancyFilterRequest{
  title?:string;
  status?:TeacherVacancyStatus;
}
