import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../../shared/utils/response/api-response';
import {Application} from '../../dtos/response/application';
import {environment} from '../../../../../environment/environment.development';
import {PaginatedApiResponse} from '../../../../shared/utils/response/paginated-api-response';
import {ApplicationDetailsResponse} from '../../dtos/response/application-details-response';

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

  getAllApplicationsByVacancy(vacancyId:number,page:number=0,size:number=10,sortBy:string='appliedDate',direction:string='desc'):Observable<PaginatedApiResponse<ApplicationDetailsResponse>>{
    return this.http.get<PaginatedApiResponse<ApplicationDetailsResponse>>(`${environment.APPLICATION_API}/vacancies/${vacancyId}?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`);
  }
}
