import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../../shared/utils/response/api-response';
import {TeacherVacancy} from '../../../teacher-vacancy/dtos/response/teacher-vacancy';
import {environment} from '../../../../../environments/environment.development';
import {TeacherVacancyStatus} from '../../../teacher-vacancy/enums/teacher-vacancy-status';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {

  private readonly http:HttpClient = inject(HttpClient);

  getVacanciesByStatusAndInstituteId(instituteId:number,status:TeacherVacancyStatus):Observable<ApiResponse<TeacherVacancy[]>>{
    return this.http.get<ApiResponse<TeacherVacancy[]>>(`${environment.INSTITUTE_API}/${instituteId}/vacancies?status=${status}`);
  }
}
