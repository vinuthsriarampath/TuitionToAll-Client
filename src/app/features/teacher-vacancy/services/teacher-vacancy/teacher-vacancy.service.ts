import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TeacherVacancyCreateRequest} from '../../dtos/request/teacher-vacancy-create-request';
import {Observable} from 'rxjs';
import {ApiResponse} from '@shared/utils/response/api-response';
import {TeacherVacancy} from '../../dtos/response/teacher-vacancy';
import {environment} from '@env/environment.development';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {TeacherVacancyStatus} from '../../enums/teacher-vacancy-status';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {TeacherVacancyFilterRequest} from '@features/teacher-vacancy/dtos/request/teacher-vacancy-filter-request';
import {buildParams} from '@shared/utils/helpers/params-helper';

@Injectable({
  providedIn: 'root'
})
export class TeacherVacancyService {

  private readonly http = inject(HttpClient);

  createVacancy(request:TeacherVacancyCreateRequest):Observable<ApiResponse<TeacherVacancy>>{
    return this.http.post<ApiResponse<TeacherVacancy>>(`${environment.TEACHER_VACANCY_API}/`,request);
  }

  getVacanciesByInstitute(pagination:PaginationRequest, filters:TeacherVacancyFilterRequest):Observable<PaginatedApiResponse<TeacherVacancy>>{
    let params = buildParams({pagination, filters});
    return this.http.get<PaginatedApiResponse<TeacherVacancy>>(`${environment.TEACHER_VACANCY_API}/my`, { params });
  }

  updateVacancy(vacancyId:number,request:TeacherVacancyCreateRequest):Observable<ApiResponse<TeacherVacancy>>{
    return this.http.patch<ApiResponse<TeacherVacancy>>(`${environment.TEACHER_VACANCY_API}/${vacancyId}`,request);
  }

  getById(vacancyId:number):Observable<ApiResponse<TeacherVacancy>>{
    return this.http.get<ApiResponse<TeacherVacancy>>(`${environment.TEACHER_VACANCY_API}/${vacancyId}`);
  }

  getByIdAndStatus(vacancyId:number,status:TeacherVacancyStatus = TeacherVacancyStatus.OPEN):Observable<ApiResponse<TeacherVacancy>>{
    return this.http.get<ApiResponse<TeacherVacancy>>(`${environment.TEACHER_VACANCY_API}/${vacancyId}?status=${status}`);
  }

}
