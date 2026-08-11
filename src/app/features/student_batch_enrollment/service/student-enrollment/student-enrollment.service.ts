import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment.development';
import {Observable} from 'rxjs';
import {EnrollmentRequest} from '@features/student_batch_enrollment/dto/request/enrollment-request/enrollment-request';

@Injectable({
  providedIn: 'root'
})
export class StudentEnrollmentService {
  private readonly baseUrl:string = environment.STUDENT_ENROLLMENT_API ?? '';
  private readonly http:HttpClient = inject(HttpClient);

  enrollStudentToCourse(request:EnrollmentRequest):Observable<Blob>{
    return this.http.post<Blob>(`${this.baseUrl}`, request,{responseType: 'blob' as 'json'});
  }

}
