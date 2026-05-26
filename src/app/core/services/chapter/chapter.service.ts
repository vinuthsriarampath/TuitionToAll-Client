import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environment/environment.development';
import { ChapterCreateRequest } from "../../dto/request-dto/chapter/ChapterCreateRequest";
import {Observable} from 'rxjs';
import {ApiResponse} from '../../dto/response-dto/api-response';
import {ChapterResponse} from '../../dto/response-dto/chapter/ChapterResponse';
import {ChapterDetailsUpdateRequest} from '../../dto/request-dto/chapter/ChapterDetailsUpdateRequest';
import {ChapterReorderRequest} from '../../dto/request-dto/chapter/ChapterReorderRequest';
import {ChapterDetailedResponse} from '../../dto/response-dto/chapter/ChapterDetailedResponse';
import {LectureRecordResponse} from '../../dto/response-dto/lecture-record/LectureRecordResponse';
import {ScheduleLectureFilterRequest} from '../../dto/request-dto/schedule-leactures/ScheduleLectureFilterRequest';
import {PaginatedApiResponse} from '../../dto/response-dto/paginated-api-response';
import {ScheduleLectureResponse} from '../../dto/response-dto/schedule-lectures/ScheduleLectureResponse';

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

  getDetailedChapterById(id:number):Observable<ApiResponse<ChapterDetailedResponse>>{
    return this.http.get<ApiResponse<ChapterDetailedResponse>>(`${this.baseUrl}/${id}/detailed`);
  }

  getAllLectureRecordsByChapterId(id:number):Observable<ApiResponse<LectureRecordResponse[]>>{
    return this.http.get<ApiResponse<LectureRecordResponse[]>>(`${this.baseUrl}/${id}/lecture-records`)
  }

  getAllScheduleLecturesWithFilters(chapterId: number, page: number = 0, size: number = 10, direction: string = 'desc', sortBy: string[] = ['created_date'], filters?: ScheduleLectureFilterRequest): Observable<PaginatedApiResponse<ScheduleLectureResponse>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('direction', direction);

    sortBy.forEach(sort =>
      params = params.append('sortBy', sort)
    );

    if (filters) {
      if (filters.id !== undefined) {
        params = params.set('id', filters.id);
      }

      if (filters.status) {
        params = params.set('status', filters.status);
      }

      if (filters.startDate) {
        params = params.set('startDate', filters.startDate);
      }

      if (filters.startTime) {
        params = params.set('startTime', filters.startTime);
      }

      if (filters.endTime) {
        params = params.set('endTime', filters.endTime);
      }

      if (filters.lateAttendance !== undefined) {
        params = params.set('lateAttendance', filters.lateAttendance);
      }
    }

    return this.http.get<PaginatedApiResponse<ScheduleLectureResponse>>(`${this.baseUrl}/api/v2/chapters/${chapterId}/schedule-lectures`, { params });
  }
}
