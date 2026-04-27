import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../dto/response-dto/api-response';
import {environment} from '../../../environment/environment.development';
import {ApplicationSelectionRequest} from '../../dto/request-dto/ApplicationSelectionRequest';
import {ApplicationSelectionResponse} from '../../dto/response-dto/ApplicationSelectionResponse';

@Injectable({
  providedIn: 'root'
})
export class InstituteTeacherService {

  private readonly http:HttpClient = inject(HttpClient);

  onboardTeachers(request: ApplicationSelectionRequest):Observable<ApiResponse<ApplicationSelectionResponse>>{
    return this.http.post<ApiResponse<ApplicationSelectionResponse>>(`${environment.INSTITUTE_TEACHER_API}/onboard`,request);
  }
}
