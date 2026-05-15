import {inject, Injectable} from '@angular/core';
import { Observable } from "rxjs";
import { PaginatedApiResponse } from "../../dto/response-dto/paginated-api-response";
import {ModuleResponse} from '../../dto/response-dto/module/ModuleResponse';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ModuleFilterRequest} from '../../dto/request-dto/module/ModuleFilterRequest';
import {ApiResponse} from '../../dto/response-dto/api-response';
import {ModuleNameUpdateRequest} from '../../dto/request-dto/module/ModuleNameUpdateRequest';
import {ModuleCreateRequest} from '../../dto/request-dto/module/ModuleCreateRequest';
import {environment} from '../../../environment/environment.development';

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
}
