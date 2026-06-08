import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../../shared/utils/response/api-response';
import {environment} from '../../../../../environment/environment.development';
import {ApplicationSelectionRequest} from '../../../applications/dtos/request/ApplicationSelectionRequest';
import {ApplicationSelectionResponse} from '../../../applications/dtos/response/ApplicationSelectionResponse';
import {ApplicationRejectionRequest} from '../../../applications/dtos/request/ApplicationRejectionRequest';
import {ApplicationRejectionResponse} from '../../../applications/dtos/response/ApplicationRejectionResponse';
import {PaginatedApiResponse} from '../../../../shared/utils/response/paginated-api-response';
import {InstituteTeacherResponse} from '../../dtos/response/InstituteTeacherResponse';
import {InstituteTeacherStatsResponse} from '../../dtos/response/InstituteTeacherStatsResponse';
import {TeacherBasicResponse} from '../../../profile/dtos/response/TeacherBasicResponse';

@Injectable({
  providedIn: 'root'
})
export class InstituteTeacherService {

  private readonly http:HttpClient = inject(HttpClient);

  onboardTeachers(request: ApplicationSelectionRequest):Observable<ApiResponse<ApplicationSelectionResponse>>{
    return this.http.post<ApiResponse<ApplicationSelectionResponse>>(`${environment.INSTITUTE_TEACHER_API}/onboard`,request);
  }

  rejectApplications(request: ApplicationRejectionRequest):Observable<ApiResponse<ApplicationRejectionResponse>>{
    return this.http.post<ApiResponse<ApplicationRejectionResponse>>(`${environment.INSTITUTE_TEACHER_API}/reject`,request);
  }

  getAllTeachersByInstitute(pageIndex:number = 0, pageSize:number = 10, direction:string = 'desc', sortBy:string = 'joinedDate'):Observable<PaginatedApiResponse<InstituteTeacherResponse>>{
    return this.http.get<PaginatedApiResponse<InstituteTeacherResponse>>(`${environment.INSTITUTE_TEACHER_API}?page=${pageIndex}&size=${pageSize}&sortBy=${sortBy}&direction=${direction}`)
  }

  getInstituteTeacherStats():Observable<ApiResponse<InstituteTeacherStatsResponse>>{
    return this.http.get<ApiResponse<InstituteTeacherStatsResponse>>(`${environment.INSTITUTE_TEACHER_API}/stats`);
  }

  getAllTeachersByCurrentInstitute():Observable<ApiResponse<TeacherBasicResponse[]>>{
    return this.http.get<ApiResponse<TeacherBasicResponse[]>>(`${environment.INSTITUTE_TEACHER_API}/basic`);
  }
}
