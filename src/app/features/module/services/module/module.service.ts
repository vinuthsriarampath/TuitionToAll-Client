import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {PaginatedApiResponse} from "../../../../shared/utils/response/paginated-api-response";
import {ModuleResponse} from '../../dtos/response/ModuleResponse';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ModuleFilterRequest} from '../../dtos/request/ModuleFilterRequest';
import {ApiResponse} from '../../../../shared/utils/response/api-response';
import {ModuleNameUpdateRequest} from '../../dtos/request/ModuleNameUpdateRequest';
import {ModuleCreateRequest} from '../../dtos/request/ModuleCreateRequest';
import {environment} from '../../../../../environments/environment.development';
import {ModuleTeacherUpdateRequest} from '../../dtos/request/ModuleTeacherUpdateRequest';
import {ModuleBatchUpdateRequest} from '../../dtos/request/ModuleBatchUpdateRequest';
import {ModuleDetailedResponse} from '../../dtos/response/ModuleDetailedResponse';
import {ChapterResponse} from '../../../chapter/dtos/response/ChapterResponse';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = environment.MODULE_API;

  createModule(request: ModuleCreateRequest): Observable<ApiResponse<ModuleResponse>> {
    return this.http.post<ApiResponse<ModuleResponse>>(`${this.baseUrl}`, request);
  }

  updateModuleName(id: number, request: ModuleNameUpdateRequest): Observable<ApiResponse<ModuleResponse>> {
    return this.http.patch<ApiResponse<ModuleResponse>>(`${this.baseUrl}/${id}`, request);
  }

  publishModule(id: number): Observable<ApiResponse<ModuleResponse>> {
    return this.http.patch<ApiResponse<ModuleResponse>>(`${this.baseUrl}/${id}/publish`, {});
  }

  lockModule(id: number): Observable<ApiResponse<ModuleResponse>> {
    return this.http.patch<ApiResponse<ModuleResponse>>(`${this.baseUrl}/${id}/lock`, {});
  }

  archiveModule(id: number): Observable<ApiResponse<ModuleResponse>> {
    return this.http.patch<ApiResponse<ModuleResponse>>(`${this.baseUrl}/${id}/archive`, {});
  }

  updateTeacher(id:number, request: ModuleTeacherUpdateRequest):Observable<ApiResponse<ModuleResponse>>{
    return this.http.patch<ApiResponse<ModuleResponse>>(`${this.baseUrl}/${id}/teacher`,request);
  }

  updateBatch(id:number,request:ModuleBatchUpdateRequest):Observable<ApiResponse<ModuleResponse>>{
    return this.http.patch<ApiResponse<ModuleResponse>>(`${this.baseUrl}/${id}/batch`,request);
  }

  getModuleById(id:number):Observable<ApiResponse<ModuleResponse>>{
    return this.http.get<ApiResponse<ModuleResponse>>(`${this.baseUrl}/${id}`);
  }

  getDetailedModuleById(id:number):Observable<ApiResponse<ModuleDetailedResponse>>{
    return this.http.get<ApiResponse<ModuleDetailedResponse>>(`${this.baseUrl}/${id}/detailed`);
  }

  getAllModules(page: number = 0, size: number = 10, direction: string = 'desc', sortBy: string[] = ['created_date'], filter?: ModuleFilterRequest): Observable<PaginatedApiResponse<ModuleResponse>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('direction', direction);

    sortBy.forEach(value => {
      params = params.append('sortBy', value);
    });

    if (filter?.status) {
      params = params.set('status', filter.status);
    }

    if (filter?.batchId) {
      params = params.set('batchId', filter.batchId);
    }

    return this.http.get<PaginatedApiResponse<ModuleResponse>>(`${this.baseUrl}`, {params});
  }

  getChaptersByModuleId(moduleId: number): Observable<ApiResponse<ChapterResponse[]>> {
    return this.http.get<ApiResponse<ChapterResponse[]>>(`${this.baseUrl}/${moduleId}/chapters/all`);
  }
}
