import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiResponse} from '../../dto/response-dto/api-response';
import {environment} from '../../../environment/environment.development';
import {CourseCreate} from '../../dto/request-dto/course/course-create';
import {Course} from '../../models/course';
import {CourseFilter} from '../../dto/request-dto/course/course-filter';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CourseUpdate} from '../../dto/request-dto/course/course-update';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private readonly http:HttpClient) { }

  getInstitute(){
    return this.http.get<ApiResponse<Course[]>>(`${environment.COURSE_API}/institute/all`);
  }

  createCourse(request:CourseCreate,file?:File){
    const formData = new FormData();
    if(file) formData.append('thumbnail',file);
    formData.append('course',new Blob([JSON.stringify(request)], { type: 'application/json' }));

    return this.http.post<ApiResponse<Course>>(`${environment.COURSE_API}/create`,formData);
  }

  updateCourse(updatingCourseId:number,request:CourseUpdate,file?:File):Observable<ApiResponse<Course>>{
    const formData = new FormData();
    if(file) formData.append('thumbnail',file);
    formData.append('course',new Blob([JSON.stringify(request)], { type: 'application/json' }));

    return this.http.patch<ApiResponse<Course>>(`${environment.COURSE_API}/update/${updatingCourseId}` ,formData);
  }

  getAllCoursesByInstituteId(instituteId:number,filter?:CourseFilter):Observable<Course[]>{

    let params = new HttpParams();
    if(filter){
      for (const [key, value] of Object.entries(filter)) {
        if (value) {
          params = params.set(key, value);
        }
      }
    }
    return this.http.get<ApiResponse<Course[]>>(
      `${environment.COURSE_API}/${instituteId}/all`,
      { params }
    ).pipe(
      map(res => res.data!)
    );
  }

  getCourseById(courseId:number):Observable<Course>{
    return this.http.get<ApiResponse<Course>>(`${environment.COURSE_API}/get/${courseId}`)
      .pipe(
        map(res => res.data!)
      );
  }
}
