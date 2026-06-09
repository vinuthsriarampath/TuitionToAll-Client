import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment.development';
import {
  ChapterAssignmentCreateRequest
} from '@features/assignments/dtos/request/chapter-assignment/chapter-assignment-create-request';
import {ApiResponse} from '@shared/utils/response/api-response';
import {Observable} from 'rxjs';
import {
  ChapterAssignmentResponse
} from '@features/assignments/dtos/response/chapter-assignment/chapter-assignment-response';

@Injectable({
  providedIn: 'root'
})
export class ChapterAssignmentService {
  private readonly http:HttpClient = inject(HttpClient);
  private readonly baseUrl: string = environment.CHAPTER_ASSIGNMENT_API ?? '';

  createChapterAssignment(request: ChapterAssignmentCreateRequest, file: File): Observable<ApiResponse<ChapterAssignmentResponse>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));

    return this.http.post<ApiResponse<ChapterAssignmentResponse>>(`${this.baseUrl}`, formData);
  }
}
