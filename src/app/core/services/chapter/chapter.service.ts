import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/environment.development';
import { ChapterCreateRequest } from "../../dto/request-dto/chapter/ChapterCreateRequest";
import {Observable} from 'rxjs';
import {ApiResponse} from '../../dto/response-dto/api-response';
import {ChapterResponse} from '../../dto/response-dto/chapter/ChapterResponse';
import {ChapterDetailsUpdateRequest} from '../../dto/request-dto/chapter/ChapterDetailsUpdateRequest';
import {ChapterReorderRequest} from '../../dto/request-dto/chapter/ChapterReorderRequest';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl = environment.CHAPTER_API;

  createChapter(request: ChapterCreateRequest): Observable<ApiResponse<ChapterResponse>> {
    return this.http.post<ApiResponse<ChapterResponse>>(`${this.baseUrl}`, request);
  }

  updateChapterDetails(id: number, request: ChapterDetailsUpdateRequest): Observable<ApiResponse<ChapterResponse>> {
    return this.http.patch<ApiResponse<ChapterResponse>>(`${this.baseUrl}/${id}/details`, request);
  }

  reorderChapters(request: ChapterReorderRequest): Observable<ApiResponse<ChapterResponse[]>> {
    return this.http.patch<ApiResponse<ChapterResponse[]>>(`${this.baseUrl}/reorder`, request);
  }

}
