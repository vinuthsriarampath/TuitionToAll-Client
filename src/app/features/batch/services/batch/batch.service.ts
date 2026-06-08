import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Batch} from '../../models/batch';
import {environment} from '../../../environments/environments.development';
import {ApiResponse} from '../../../shared/utils/response/api-response';
import {BatchCreateRequest} from '../../dto/request-dto/batch/batch-create-request';
import {BatchUpdateRequest} from '../../dto/request-dto/batch/batch-update-request';
import {PaginatedApiResponse} from '../../../shared/utils/response/paginated-api-response';
import {ModuleResponse} from '../../../features/module/dtos/response/ModuleResponse';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor( private readonly http:HttpClient) { }

  getAllBatchesByCourseId(courseId:number):Observable<ApiResponse<Batch[]>>{
    return this.http.get<ApiResponse<Batch[]>>(`${environment.BATCH_API}/${courseId}/all`)
  }

  createBatch(request:BatchCreateRequest):Observable<ApiResponse<Batch>>{
    return this.http.post<ApiResponse<Batch>>(`${environment.BATCH_API}/create`,request);
  }

  updateBatch(batchId:number, request:BatchUpdateRequest):Observable<ApiResponse<Batch>>{
    return this.http.patch<ApiResponse<Batch>>(`${environment.BATCH_API}/${batchId}/update`,request);
  }

  getBatchById(batchId: number):Observable<ApiResponse<Batch>> {
    return this.http.get<ApiResponse<Batch>>(`${environment.BATCH_API}/find/batch/${batchId}`);
  }

  getAllModulesByBatch(id: number, page: number = 0, size: number = 10, direction: string = 'desc', sortBy: string[] = ['created_date']): Observable<PaginatedApiResponse<ModuleResponse>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('direction', direction);

    sortBy.forEach(value => {
      params = params.append('sortBy', value);
    });

    return this.http.get<PaginatedApiResponse<ModuleResponse>>(`${environment.BATCH_API}/${id}/modules`, { params });
  }
}
