import {inject, Injectable} from '@angular/core';
import {environment} from '@env/environment.development';
import {HttpClient} from '@angular/common/http';
import {TeacherDetailsUpdateRequest} from '@features/teacher/dtos/requests/TeacherDetailsUpdateRequest';
import {ApiResponse} from '@shared/utils/response/api-response';
import {Teacher} from '@features/teacher/dtos/responses/teacher';
import {Observable} from 'rxjs';
import {TeachingResponse} from '@features/teacher/dtos/responses/teaching-response';
import {TeacherCourseViewResponse} from '@features/course/dtos/response/teacher-course-view-response';
import {TeacherApplicationFilterRequest} from '@features/applications/dtos/request/teacher-application-filter-request';
import {TeacherApplicationResponse} from '@features/applications/dtos/response/teacher-application-response';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {addFilterParams, buildPaginationParams} from '@shared/utils/helpers/params-helper';
import {TeacherBootstrapResponse} from '@features/teacher/dtos/responses/teacher-bootstrap-response';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private readonly baseUrl:string = environment.TEACHER_API;
  private readonly http:HttpClient = inject(HttpClient);

  updateTeacherDetails(updateRequest: TeacherDetailsUpdateRequest){
    return this.http.patch<ApiResponse<Teacher>>(`${this.baseUrl}/me`,updateRequest);
  }

  validateTeacherRole():Observable<ApiResponse<null>>{
    return this.http.get<ApiResponse<null>>(`${this.baseUrl}/validate/role`);
  }

  getMyTeachingDetails(): Observable<ApiResponse<TeachingResponse[]>> {
    return this.http.get<ApiResponse<TeachingResponse[]>>(`${this.baseUrl}/me/teachings`);
  }

  public getTeacherDetailedCourse(courseId: number): Observable<ApiResponse<TeacherCourseViewResponse>> {
    return this.http.get<ApiResponse<TeacherCourseViewResponse>>(`${this.baseUrl}/me/teachings/courses/${courseId}`);
  }

  getMyApplications(pagination: PaginationRequest, filters?: TeacherApplicationFilterRequest): Observable<PaginatedApiResponse<TeacherApplicationResponse>> {

    let params = buildPaginationParams(pagination);

    if (filters) {
      params = addFilterParams(params, filters);
    }

    return this.http.get<PaginatedApiResponse<TeacherApplicationResponse>>(`${this.baseUrl}/me/applications`, { params });
  }

  getTeacherBootstrapData(): Observable<ApiResponse<TeacherBootstrapResponse>> {
    return this.http.get<ApiResponse<TeacherBootstrapResponse>>(`${this.baseUrl}/me/bootstrap`);
  }
}
