import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment.development';
import {Observable} from 'rxjs';
import {EnrollmentRequest} from '@features/student_batch_enrollment/dto/request/enrollment-request/enrollment-request';
import {
  EnrollmentEligibilityCheckRequest
} from '@features/student_batch_enrollment/dto/request/enrollment-eligibility-check-request/enrollment-eligibility-check-request';
import {
  EnrollmentEligibilityResponse
} from '@features/student_batch_enrollment/dto/response/enrollment-eligibility-response/enrollment-eligibility-response';
import {ApiResponse} from '@shared/utils/response/api-response';

@Injectable({
  providedIn: 'root'
})
export class StudentEnrollmentService {
  private readonly baseUrl:string = environment.STUDENT_ENROLLMENT_API ?? '';
  private readonly http:HttpClient = inject(HttpClient);

  enrollStudentToCourse(request:EnrollmentRequest):Observable<Blob>{
    return this.http.post<Blob>(`${this.baseUrl}`, request,{responseType: 'blob' as 'json'});
  }

  checkEnrollmentEligibility(request: EnrollmentEligibilityCheckRequest): Observable<ApiResponse<EnrollmentEligibilityResponse>> {
    let params = new HttpParams()
      .set('courseId', request.courseId.toString())
      .set('batchId', request.batchId.toString());

    return this.http.get<ApiResponse<EnrollmentEligibilityResponse>>(`${this.baseUrl}/eligibility-check`, { params } );
  }
}
