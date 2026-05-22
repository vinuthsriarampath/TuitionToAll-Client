import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {environment} from '../../../environment/environment.development';
import {LectureRecordUploadInitResponse} from '../../dto/response-dto/lecture-record/LectureRecordUploadInitResponse';
import {ApiResponse} from '../../dto/response-dto/api-response';
import {Observable} from 'rxjs';
import {LectureRecordUploadInitRequest} from '../../dto/request-dto/lecture-record/LectureRecordUploadInitRequest';
import {LectureRecordChunkUploadResponse} from '../../dto/response-dto/lecture-record/LectureRecordChunkUploadResponse';
import {LectureRecordResponse} from '../../dto/response-dto/lecture-record/LectureRecordResponse';

@Injectable({
  providedIn: 'root'
})
export class LectureRecordService {

  private readonly baseUrl = environment.LECTURE_RECORD_API;
  private readonly http:HttpClient = inject(HttpClient);

  initializeUpload(request: LectureRecordUploadInitRequest): Observable<ApiResponse<LectureRecordUploadInitResponse>> {
    return this.http.post<ApiResponse<LectureRecordUploadInitResponse>>( `${this.baseUrl}/upload/init`, request );
  }

  uploadChunk( uploadId: string, chunkIndex: number, chunk: Blob ): Observable<HttpEvent<ApiResponse<LectureRecordChunkUploadResponse>>> {

    const formData = new FormData();

    formData.append('uploadId', uploadId);
    formData.append('chunkIndex', chunkIndex.toString());
    formData.append('chunk', chunk);

    return this.http.post<ApiResponse<LectureRecordChunkUploadResponse>>( `${this.baseUrl}/upload/chunk`, formData, { reportProgress: true, observe: 'events' } );
  }

  completeUpload( uploadId: string ): Observable<ApiResponse<LectureRecordResponse>> {
    return this.http.post<ApiResponse<LectureRecordResponse>>( `${this.baseUrl}/upload/complete/${uploadId}`, {} );
  }

  getStreamToken(fileName:string): Observable<ApiResponse<string>>{
    return this.http.get<ApiResponse<string>>(`${this.baseUrl}/stream-token/${fileName}`);
  }
}
