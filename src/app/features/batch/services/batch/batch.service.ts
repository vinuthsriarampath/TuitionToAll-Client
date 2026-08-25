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
import { StudentUserResponse } from "@features/student/dtos/responses/student-user-response/student-user-response";
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import { BatchFilterRequest } from "@features/batch/dtos/request/batch-filter-request";
import {BatchDetailedResponse} from '@features/batch/dtos/response/batch-detailed-response';

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

  getEnrollableBatchesOfCourse(courseId:number):Observable<ApiResponse<Batch[]>> {
    return this.http.get<ApiResponse<Batch[]>>(`${environment.BATCH_API}/${courseId}/enrollables`);
  }

  getStudentsByBatch(batchId: number, paginationRequest:PaginationRequest): Observable<PaginatedApiResponse<StudentUserResponse>> {

    const { page, size, direction, sortBy } = paginationRequest;

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('direction', direction);

    sortBy.forEach(value => {
      params = params.append('sortBy', value);
    });

    return this.http.get<PaginatedApiResponse<StudentUserResponse>>(`${environment.BATCH_API}/${batchId}/students`, { params });
  }

  getDetailedBatches(pagination: PaginationRequest, filters?: BatchFilterRequest): Observable<PaginatedApiResponse<BatchDetailedResponse>> {

    const { page, size, direction, sortBy } = pagination;
    const { id, batchName, courseId, instituteId, status, enrollmentStatus } = filters ?? {};

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('direction', direction);

    sortBy.forEach(sort => {
      params = params.append('sortBy', sort);
    });

    if (id !== undefined) {
      params = params.set('id', id);
    }

    if (batchName !== undefined) {
      params = params.set('batchName', batchName);
    }

    if (courseId !== undefined) {
      params = params.set('courseId', courseId);
    }

    if (instituteId !== undefined) {
      params = params.set('instituteId', instituteId);
    }

    if (status !== undefined) {
      params = params.set('status', status);
    }

    if (enrollmentStatus !== undefined) {
      params = params.set('enrollmentStatus', enrollmentStatus);
    }

    return this.http.get<PaginatedApiResponse<BatchDetailedResponse>>(`${environment.BATCH_API}/detailed`, { params });
  }
}
