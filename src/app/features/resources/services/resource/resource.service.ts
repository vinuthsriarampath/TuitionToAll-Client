import {inject, Injectable} from '@angular/core';
import {environment} from '@env/environment.development';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from "rxjs";
import {ResourceInitRequest} from '../../dtos/request/ResourceInitRequest';
import {ApiResponse} from "@shared/utils/response/api-response";
import {ResourceInitResponse} from '../../dtos/response/ResourceInitResponse';
import {ResourceChunkUploadResponse} from '../../dtos/response/ResourceChunkUploadResponse';
import {ResourceResponse} from '../../dtos/response/ResourceResponse';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = environment.RESOURCE_API ?? '';


  initializeUpload(request: ResourceInitRequest): Observable<ApiResponse<ResourceInitResponse>> {
    return this.http.post<ApiResponse<ResourceInitResponse>>(`${this.baseUrl}/upload/init`, request);
  }

  uploadChunk(uploadId: string, chunkIndex: number, file: Blob): Observable<HttpEvent<ApiResponse<ResourceChunkUploadResponse>>> {

    const formData = new FormData();
    formData.append('uploadId', uploadId);
    formData.append('chunkIndex', chunkIndex.toString());
    formData.append('file', file);

    return this.http.post<ApiResponse<ResourceChunkUploadResponse>>(`${this.baseUrl}/upload/chunk`, formData, { reportProgress: true, observe: 'events' });
  }

  completeUpload(uploadId: string): Observable<ApiResponse<ResourceResponse>> {
    return this.http.post<ApiResponse<ResourceResponse>>(`${this.baseUrl}/upload/complete/${uploadId}`, {});
  }

  deleteResource(resourceId:number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${resourceId}`)
  }
}
