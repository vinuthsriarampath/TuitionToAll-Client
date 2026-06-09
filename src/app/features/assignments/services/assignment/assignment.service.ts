import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment.development';
import {AssignmentUpdateRequest} from '@features/assignments/dtos/request/assignment-update-request';
import {ApiResponse} from '@shared/utils/response/api-response';
import {Observable} from 'rxjs';
import {AssignmentDetailedResponse} from '@features/assignments/dtos/response/assignment-detailed-response';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private readonly http:HttpClient = inject(HttpClient);
  private readonly baseUrl: string = environment.CHAPTER_ASSIGNMENT_API ?? '';

  updateAssignment(id: number, request: AssignmentUpdateRequest): Observable<ApiResponse<AssignmentDetailedResponse>> {
    return this.http.patch<ApiResponse<AssignmentDetailedResponse>>(`${this.baseUrl}/${id}`, request);
  }

  updateAssignmentFile(id: number, file: File): Observable<ApiResponse<string>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.patch<ApiResponse<string>>(`${this.baseUrl}/${id}/files`, formData);
  }

  getDetailedAssignmentById(id: number): Observable<ApiResponse<AssignmentDetailedResponse>> {
    return this.http.get<ApiResponse<AssignmentDetailedResponse>>(`${this.baseUrl}/${id}/detailed`);
  }
}
