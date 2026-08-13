import {inject, Injectable} from '@angular/core';
import {environment} from '@env/environment.development';
import {HttpClient} from '@angular/common/http';
import {
  StudentDetailsUpdateRequest
} from '@features/profile/dtos/request/user-update/sub-user-details-update-dto/StudentDetailsUpdateRequest';
import {ApiResponse} from '@shared/utils/response/api-response';
import {Student} from '@features/profile/dtos/response/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly baseUrl:string = environment.STUDENT_API;
  private readonly http:HttpClient = inject(HttpClient);

  updateStudentDetails(updateRequest: StudentDetailsUpdateRequest){
    return this.http.patch<ApiResponse<Student>>(`${this.baseUrl}/me`,updateRequest);
  }
}
