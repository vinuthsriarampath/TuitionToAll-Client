import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../dto/response-dto/api-response';
import {environment} from '../../../environment/environment.development';
import {CourseCreate} from '../../dto/request-dto/course/course-create';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private readonly http:HttpClient) { }

  getInstitute(){
    return this.http.get<ApiResponse>(`${environment.COURSE_API}/institute/all`);
  }

  createCourse(request:CourseCreate){
    return this.http.post<ApiResponse>(`${environment.COURSE_API}/create`,request);
  }
}
