import {inject, Injectable} from '@angular/core';
import {environment} from '@env/environment.development';
import {HttpClient} from '@angular/common/http';
import {
  TeacherDetailsUpdateRequest
} from '@features/profile/dtos/request/user-update/sub-user-details-update-dto/TeacherDetailsUpdateRequest';
import {ApiResponse} from '@shared/utils/response/api-response';
import {Teacher} from '@features/teacher/dtos/responses/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private readonly baseUrl:string = environment.TEACHER_API;
  private readonly http:HttpClient = inject(HttpClient);

  updateTeacherDetails(updateRequest: TeacherDetailsUpdateRequest){
    return this.http.patch<ApiResponse<Teacher>>(`${this.baseUrl}/me`,updateRequest);
  }
}
