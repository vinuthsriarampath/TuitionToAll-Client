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

  createCourse(request:CourseCreate,file?:File){
    const formData = new FormData();
    if(file) formData.append('thumbnail',file);
    formData.append('course',new Blob([JSON.stringify(request)], { type: 'application/json' }));

    return this.http.post<ApiResponse>(`${environment.COURSE_API}/create`,formData);
  }
}
