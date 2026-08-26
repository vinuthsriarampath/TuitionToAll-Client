import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment.development';
import {
  ModuleAssignmentCreateRequest
} from "@features/assignments/dtos/request/module-assignment/module-assignment-create-request";
import {
  ModuleAssignmentResponse
} from '@features/assignments/dtos/response/module-assignment/module-assignment-response';
import {ApiResponse} from '@shared/utils/response/api-response';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleAssignmentService {
  private readonly http:HttpClient = inject(HttpClient);
  private readonly baseUrl: string = environment.MODULE_ASSIGNMENT_API ?? '';

  createModuleAssignment(request: ModuleAssignmentCreateRequest, file: File): Observable<ApiResponse<ModuleAssignmentResponse>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));

    return this.http.post<ApiResponse<ModuleAssignmentResponse>>(`${this.baseUrl}`, formData);
  }
}
