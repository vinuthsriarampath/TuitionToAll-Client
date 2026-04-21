import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TeacherVacancyCreateRequest} from '../../dto/request-dto/teacher-vacancy/teacher-vacancy-create-request';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../dto/response-dto/api-response';
import {TeacherVacancy} from '../../models/teacher-vacancy';
import {environment} from '../../../environment/environment.development';
import {PaginatedApiResponse} from '../../dto/response-dto/paginated-api-response';

@Injectable({
  providedIn: 'root'
})
export class TeacherVacancyService {

  private readonly http = inject(HttpClient);

  createVacancy(request:TeacherVacancyCreateRequest):Observable<ApiResponse<TeacherVacancy>>{
    return this.http.post<ApiResponse<TeacherVacancy>>(`${environment.TEACHER_VACANCY_API}/`,request);
  }

  getVacanciesByInstitute(pageIndex:number = 0, pageSize:number = 10):Observable<PaginatedApiResponse<TeacherVacancy>>{
    return this.http.get<PaginatedApiResponse<TeacherVacancy>>(`${environment.TEACHER_VACANCY_API}/my?page=${pageIndex}&size=${pageSize}`);
  }

  updateVacancy(vacancyId:number,request:TeacherVacancyCreateRequest):Observable<ApiResponse<TeacherVacancy>>{
    return this.http.patch<ApiResponse<TeacherVacancy>>(`${environment.TEACHER_VACANCY_API}/${vacancyId}`,request);
  }

  getById(vacancyId:number):Observable<ApiResponse<TeacherVacancy>>{
    return this.http.get<ApiResponse<TeacherVacancy>>(`${environment.TEACHER_VACANCY_API}/${vacancyId}`);
  }

}
