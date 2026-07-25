import { ResolveFn } from '@angular/router';
import {TeacherVacancy} from '@features/teacher-vacancy/dtos/response/teacher-vacancy';
import {inject} from '@angular/core';
import {TeacherVacancyService} from '@features/teacher-vacancy/services/teacher-vacancy/teacher-vacancy.service';
import {map} from 'rxjs/operators';

export const teacherVacancyResolver: ResolveFn<TeacherVacancy> = (route, state) => {
  const teacherVacancyService = inject(TeacherVacancyService);
  return teacherVacancyService.getByIdAndStatus(Number(route.paramMap.get('teacherVacancyId'))).pipe(
    map((res) => res.data as TeacherVacancy)
  );
};
