import {inject, Injectable} from '@angular/core';
import { Observable } from "rxjs";
import {ApiResponse} from '@shared/utils/response/api-response';
import {buildParams} from '@shared/utils/helpers/params-helper';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {NotificationResponse} from '@features/notifications/dtos/responses/notification-response';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {environment} from '@env/environment.development';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly http = inject(HttpClient);

  private readonly baseUrl: string = environment.NOTIFICATION_API ?? '';

  /**
   * Get paginated notifications for a specific user.
   */
  getUserNotifications(userId: number, pagination: PaginationRequest): Observable<PaginatedApiResponse<NotificationResponse>> {

    const params = buildParams({pagination});

    return this.http.get<PaginatedApiResponse<NotificationResponse>>(`${this.baseUrl}/user/${userId}`, { params });
  }

  /**
   * Get unread notification count for badge display.
   */
  getUnreadCount(userId: number): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(`${this.baseUrl}/user/${userId}/unread-count`);
  }

  /**
   * Mark a specific notification as read.
   */
  markAsRead(
    notificationId: number, userId: number): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${this.baseUrl}/${notificationId}/read`, null, {params: { userId }});
  }

  /**
   * Mark all unread notifications as read for a user.
   */
  markAllAsRead(userId: number): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${this.baseUrl}/user/${userId}/read-all`, null);
  }
}
