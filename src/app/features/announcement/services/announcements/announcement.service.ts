import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment.development';
import {AnnouncementCreateRequest} from "../../dtos/request/AnnouncementCreateRequest";
import {ApiResponse} from '@shared/utils/response/api-response';
import {Observable} from "rxjs";
import {AnnouncementResponse} from '../../dtos/response/AnnouncementResponse';
import {AnnouncementVisibilityUpdateRequest} from '../../dtos/request/AnnouncementVisibilityUpdateRequest';
import {AnnouncementUpdateRequest} from '../../dtos/request/AnnouncementUpdateRequest';
import {AnnouncementFilterRequest} from '../../dtos/request/AnnouncementFilterRequest';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {buildParams} from '@shared/utils/helpers/params-helper';

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

  updateAnnouncement(announcementId: number, request: AnnouncementUpdateRequest): Observable<ApiResponse<AnnouncementResponse>> {
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

  getAllAnnouncements(pagination: PaginationRequest, filters?: AnnouncementFilterRequest): Observable<PaginatedApiResponse<AnnouncementResponse>> {
    let params = buildParams({pagination, filters});
    return this.http.get<PaginatedApiResponse<AnnouncementResponse>>(`${this.baseUrl}`, { params });
  }

  publishAnnouncement(announcementId:number):Observable<ApiResponse<AnnouncementResponse>>{
    return this.http.patch<ApiResponse<AnnouncementResponse>>(`${this.baseUrl}/${announcementId}/publish`,null);
  }

  deleteAnnouncement(announcementId:number):Observable<ApiResponse<AnnouncementResponse>>{
    return this.http.delete<ApiResponse<AnnouncementResponse>>(`${this.baseUrl}/${announcementId}`);
  }

  getAnnouncementById(announcementId:number):Observable<ApiResponse<AnnouncementResponse>>{
    return this.http.get<ApiResponse<AnnouncementResponse>>(`${this.baseUrl}/${announcementId}`);
  }
}
