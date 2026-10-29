import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '@shared/utils/response/api-response';
import {Application} from '../../dtos/response/application';
import {environment} from '@env/environment.development';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {ApplicationDetailsResponse} from '../../dtos/response/application-details-response';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {ApplicationFilterRequest} from '@features/applications/dtos/request/application-filter-request';
import {buildParams} from '@shared/utils/helpers/params-helper';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private readonly http:HttpClient = inject(HttpClient);

  createApplication(vacancyId:number):Observable<ApiResponse<Application>>{
    return this.http.post<ApiResponse<Application>>(`${environment.APPLICATION_API}/vacancies/${vacancyId}/apply`,null)
  }

  checkIfUserAlreadyApplied(teacherId:number,vacancyId:number):Observable<ApiResponse<boolean>>{
    return this.http.get<ApiResponse<boolean>>(`${environment.APPLICATION_API}/check?teacherId=${teacherId}&vacancyId=${vacancyId}`);
  }

  getAllApplicationsByVacancy(vacancyId:number, pagination:PaginationRequest, filters:ApplicationFilterRequest):Observable<PaginatedApiResponse<ApplicationDetailsResponse>>{
    let params = buildParams({pagination, filters})
    return this.http.get<PaginatedApiResponse<ApplicationDetailsResponse>>(`${environment.APPLICATION_API}/vacancies/${vacancyId}`, { params });
  }
}
