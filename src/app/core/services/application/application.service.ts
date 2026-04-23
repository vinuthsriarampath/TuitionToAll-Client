import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../dto/response-dto/api-response';
import {Application} from '../../models/application';
import {environment} from '../../../environment/environment.development';

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
}
