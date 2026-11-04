import {inject, Injectable} from '@angular/core';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {ChatMessageResponse} from '@features/messaging/dtos/responses/chat-message-response';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConversationResponse} from '@features/messaging/dtos/responses/conversation-response';
import {ApiResponse} from '@shared/utils/response/api-response';
import {environment} from '@env/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = environment.CONVERSATION_API ?? '';

  /**
   * Fetch all conversation threads for the authenticated user.
   */
  getUserConversations(): Observable<ApiResponse<ConversationResponse[]>> {
    return this.http.get<ApiResponse<ConversationResponse[]>>(this.baseUrl);
  }

  /**
   * Start or fetch an existing direct 1-to-1 conversation.
   */
  getOrCreateDirectConversation(targetUserId: number): Observable<ApiResponse<ConversationResponse>> {
    return this.http.post<ApiResponse<ConversationResponse>>(`${this.baseUrl}/direct/${targetUserId}`, {});
  }

  /**
   * Fetch paginated message history for a conversation.
   */
  gtConversationMessages(
    conversationId: number, page: number = 0, size: number = 30): Observable<PaginatedApiResponse<ChatMessageResponse>> {

    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PaginatedApiResponse<ChatMessageResponse>>(`${this.baseUrl}/${conversationId}/messages`, { params });
  }
}
