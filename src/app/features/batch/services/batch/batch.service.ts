import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env/environment.development';
import {Batch} from '@features/batch/dtos/response/batch';
import {ApiResponse} from '@shared/utils/response/api-response';
import {BatchCreateRequest} from '@features/batch/dtos/request/batch-create-request';
import {BatchUpdateRequest} from '@features/batch/dtos/request/batch-update-request';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {ModuleResponse} from '@features/module/dtos/response/ModuleResponse';
import {StudentUserResponse} from "@features/student/dtos/responses/student-user-response/student-user-response";
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {BatchFilterRequest} from "@features/batch/dtos/request/batch-filter-request";
import {BatchDetailedResponse} from '@features/batch/dtos/response/batch-detailed-response';
import {addFilterParams, buildPaginationParams, buildParams} from '@shared/utils/helpers/params-helper';
import {ModuleFilterRequest} from '@features/module/dtos/request/ModuleFilterRequest';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor( private readonly http:HttpClient) { }

  getAllBatchesByCourseId(courseId:number, pagination:PaginationRequest, filters?:BatchFilterRequest):Observable<PaginatedApiResponse<Batch>>{
    const params = buildParams({pagination, filters});
    return this.http.get<PaginatedApiResponse<Batch>>(`${environment.BATCH_API}/course/${courseId}`, { params });
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

  getAllModulesByBatch(batchId: number, pagination:PaginationRequest, filters?:ModuleFilterRequest): Observable<PaginatedApiResponse<ModuleResponse>> {
    const params = buildParams({pagination, filters});
    return this.http.get<PaginatedApiResponse<ModuleResponse>>(`${environment.BATCH_API}/${batchId}/modules`, { params });
  }

  getEnrollableBatchesOfCourse(courseId:number):Observable<ApiResponse<Batch[]>> {
    return this.http.get<ApiResponse<Batch[]>>(`${environment.BATCH_API}/${courseId}/enrollables`);
  }

  getStudentsByBatch(batchId: number, pagination:PaginationRequest): Observable<PaginatedApiResponse<StudentUserResponse>> {
    const params = buildParams({pagination});
    return this.http.get<PaginatedApiResponse<StudentUserResponse>>(`${environment.BATCH_API}/${batchId}/students`, { params });
  }

  getDetailedBatches(pagination: PaginationRequest, filters?: BatchFilterRequest): Observable<PaginatedApiResponse<BatchDetailedResponse>> {
    const params = buildParams({pagination, filters});
    return this.http.get<PaginatedApiResponse<BatchDetailedResponse>>(`${environment.BATCH_API}/detailed`, { params });
  }
}
