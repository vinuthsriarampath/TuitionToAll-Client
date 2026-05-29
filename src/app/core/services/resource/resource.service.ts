import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environment/environment.development';
import {HttpClient, HttpEvent} from '@angular/common/http';
import { Observable } from "rxjs";
import {ResourceInitRequest} from '../../dto/request-dto/resource/ResourceInitRequest';
import { ApiResponse } from "../../dto/response-dto/api-response";
import {ResourceInitResponse} from '../../dto/response-dto/resource/ResourceInitResponse';
import {ResourceChunkUploadResponse} from '../../dto/response-dto/resource/ResourceChunkUploadResponse';
import {ResourceResponse} from '../../dto/response-dto/resource/ResourceResponse';

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
}
