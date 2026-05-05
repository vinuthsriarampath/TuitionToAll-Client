import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environment/environment.development';
import { AnnouncementCreateRequest } from "../../dto/request-dto/announcement/AnnouncementCreateRequest";
import {ApiResponse} from '../../dto/response-dto/api-response';
import { Observable } from "rxjs";
import {AnnouncementResponse} from '../../dto/response-dto/AnnouncementResponse';
import {
  AnnouncementVisibilityUpdateRequest
} from '../../dto/request-dto/announcement/AnnouncementVisibilityUpdateRequest';
import {AnnouncementUpdateRequest} from '../../dto/request-dto/announcement/AnnouncementUpdateRequest';
import {AnnouncementFilterRequest} from '../../dto/request-dto/announcement/AnnouncementFilterRequest';
import {PaginatedApiResponse} from '../../dto/response-dto/paginated-api-response';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private readonly http:HttpClient = inject(HttpClient);
  private readonly baseUrl = environment.ANNOUNCEMENT_API;

  createAnnouncement(request: AnnouncementCreateRequest): Observable<ApiResponse<AnnouncementResponse>> {
    return this.http.post<ApiResponse<AnnouncementResponse>>(`${this.baseUrl}`, request);
  }

  updateAnnouncementVisibility(announcementId: number, request: AnnouncementVisibilityUpdateRequest): Observable<ApiResponse<AnnouncementResponse>> {
    return this.http.patch<ApiResponse<AnnouncementResponse>>(`${this.baseUrl}/${announcementId}/visibility`, request);
  }

  updateAnnouncementTitleAndDescription(announcementId: number, request: AnnouncementUpdateRequest): Observable<ApiResponse<AnnouncementResponse>> {
    return this.http.patch<ApiResponse<AnnouncementResponse>>(`${this.baseUrl}/${announcementId}`, request);
  }

  archiveAnnouncement(id: number): Observable<ApiResponse<AnnouncementResponse>> {
    return this.http.patch<ApiResponse<AnnouncementResponse>>(`${this.baseUrl}/${id}/archive`, {});
  }

  pinAnnouncement(id: number): Observable<ApiResponse<AnnouncementResponse>> {
    return this.http.patch<ApiResponse<AnnouncementResponse>>(`${this.baseUrl}/${id}/pin`, {});
  }

  unpinAnnouncement(id: number): Observable<ApiResponse<AnnouncementResponse>> {
    return this.http.patch<ApiResponse<AnnouncementResponse>>(`${this.baseUrl}/${id}/unpin`, {});
  }

  getAllAnnouncements(page: number = 0, size: number = 5, direction: string = 'desc', sortBy: string[] = ['published_date'], filters?: AnnouncementFilterRequest): Observable<PaginatedApiResponse<AnnouncementResponse>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('direction', direction);

    sortBy.forEach(s => {
      params = params.append('sortBy', s);
    });

    if(filters){
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          params = params.set(key, value);
        }
      }
    }

    return this.http.get<PaginatedApiResponse<AnnouncementResponse>>(`${this.baseUrl}`, { params });
  }
}
