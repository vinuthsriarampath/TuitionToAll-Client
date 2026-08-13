import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '@shared/utils/response/api-response';
import {TeacherVacancy} from '../../../teacher-vacancy/dtos/response/teacher-vacancy';
import {environment} from '@env/environment.development';
import {TeacherVacancyStatus} from '../../../teacher-vacancy/enums/teacher-vacancy-status';
import {
  InstituteDetailsUpdateRequest
} from '@features/profile/dtos/request/user-update/sub-user-details-update-dto/InstituteDetailsUpdateRequest';
import {Institute} from '@features/profile/dtos/response/institute';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {

  private readonly http:HttpClient = inject(HttpClient);

  getVacanciesByStatusAndInstituteId(instituteId:number,status:TeacherVacancyStatus):Observable<ApiResponse<TeacherVacancy[]>>{
    return this.http.get<ApiResponse<TeacherVacancy[]>>(`${environment.INSTITUTE_API}/${instituteId}/vacancies?status=${status}`);
  }

  updateInstituteDetails(updateRequest: InstituteDetailsUpdateRequest){
    return this.http.patch<ApiResponse<Institute>>(`${environment.INSTITUTE_API}/me`,updateRequest);
  }
}
