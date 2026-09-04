import {inject, Injectable} from '@angular/core';
import {environment} from '@env/environment.development';
import {HttpClient} from '@angular/common/http';
import {StudentDetailsUpdateRequest} from '@features/student/dtos/requests/StudentDetailsUpdateRequest';
import {ApiResponse} from '@shared/utils/response/api-response';
import {Student} from '@features/student/dtos/responses/student';
import {Observable} from 'rxjs';
import {StudentLearningResponse} from '@features/student/dtos/responses/student-learning-response';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly baseUrl:string = environment.STUDENT_API;
  private readonly http:HttpClient = inject(HttpClient);

  updateStudentDetails(updateRequest: StudentDetailsUpdateRequest){
    return this.http.patch<ApiResponse<Student>>(`${this.baseUrl}/me`,updateRequest);
  }

  validateStudentRole():Observable<ApiResponse<null>>{
    return this.http.get<ApiResponse<null>>(`${this.baseUrl}/validate/role`);
  }

  getMyLearning():Observable<ApiResponse<StudentLearningResponse[]>> {
    return this.http.get<ApiResponse<StudentLearningResponse[]>>(`${this.baseUrl}/me/learning`);
  }
}
