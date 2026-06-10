import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment.development';
import {ChapterCreateRequest} from "../../dtos/request/ChapterCreateRequest";
import {Observable} from 'rxjs';
import {ApiResponse} from '@shared/utils/response/api-response';
import {ChapterResponse} from '../../dtos/response/ChapterResponse';
import {ChapterDetailsUpdateRequest} from '../../dtos/request/ChapterDetailsUpdateRequest';
import {ChapterReorderRequest} from '../../dtos/request/ChapterReorderRequest';
import {ChapterDetailedResponse} from '../../dtos/response/ChapterDetailedResponse';
import {LectureRecordResponse} from '../../../lecture-record/dtos/response/LectureRecordResponse';
import {ScheduleLectureFilterRequest} from '../../../schedule-lectures/dtos/request/ScheduleLectureFilterRequest';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {ScheduleLectureResponse} from '../../../schedule-lectures/dtos/response/ScheduleLectureResponse';
import {ResourceResponse} from '../../../resources/dtos/response/ResourceResponse';
import {ResourceFilterRequest} from '../../../resources/dtos/request/ResourceFilterRequest';
import {
  ChapterAssignmentFilterRequest
} from '@features/assignments/dtos/request/chapter-assignment/chapter-assignment-filter-request';
import {
  ChapterAssignmentResponse
} from '@features/assignments/dtos/response/chapter-assignment/chapter-assignment-response';
import {Assignment} from '@features/assignments/dtos/response/assignment';

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
      if (filters.scheduleLectureId !== undefined) {
        params = params.set('scheduleLectureId', filters.scheduleLectureId);
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

    return this.http.get<PaginatedApiResponse<ScheduleLectureResponse>>(`${this.baseUrl}/${chapterId}/schedule-lectures`, { params });
  }

  getAllResourcesWithFilters(chapterId: number, page: number = 0, size: number = 10, direction: string = 'desc', sortBy: string[] = ['created_date'], filters?: ResourceFilterRequest): Observable<PaginatedApiResponse<ResourceResponse>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('direction', direction);

    sortBy.forEach(s => {
      params = params.append('sortBy', s);
    });

    if (filters?.resourceId != null) {
      params = params.set('resourceId', filters.resourceId);
    }

    if (filters?.name) {
      params = params.set('name', filters.name);
    }

    return this.http.get<PaginatedApiResponse<ResourceResponse>>(`${this.baseUrl}/${chapterId}/resources`, { params });
  }

  getAllChapterAssignmentsWithFilters(chapterId: number, page: number = 0, size: number = 10, direction: string = 'desc', sortBy: string[] = ['created_date'], filters?: ChapterAssignmentFilterRequest): Observable<PaginatedApiResponse<Assignment>> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('direction', direction);

    // Append individual sortBy items for List<String> binding
    sortBy.forEach(field => {
      params = params.append('sortBy', field);
    });

    // Dynamically map non-null filters into query parameters
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = (filters as any)[key];
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<PaginatedApiResponse<ChapterAssignmentResponse>>(`${this.baseUrl}/${chapterId}/assignments`, {params});
  }
}
