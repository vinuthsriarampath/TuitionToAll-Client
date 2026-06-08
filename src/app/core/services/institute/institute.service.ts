import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../shared/utils/response/api-response';
import {TeacherVacancy} from '../../../features/teacher-vacancy/dtos/response/teacher-vacancy';
import {environment} from '../../../environment/environment.development';
import {TeacherVacancyStatus} from '../../../features/teacher-vacancy/enums/teacher-vacancy-status';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {

  private readonly http:HttpClient = inject(HttpClient);

  getVacanciesByStatusAndInstituteId(instituteId:number,status:TeacherVacancyStatus):Observable<ApiResponse<TeacherVacancy[]>>{
    return this.http.get<ApiResponse<TeacherVacancy[]>>(`${environment.INSTITUTE_API}/${instituteId}/vacancies?status=${status}`);
  }
}
