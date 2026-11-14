import {inject, Injectable, signal} from '@angular/core';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {ChatMessageResponse} from '@features/messaging/dtos/responses/chat-message-response';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConversationResponse} from '@features/messaging/dtos/responses/conversation-response';
import {ApiResponse} from '@shared/utils/response/api-response';
import {environment} from '@env/environment.development';
import {ConversationFilterRequest} from '@features/messaging/dtos/requests/conversation-filter-request';
import {buildParams} from '@shared/utils/helpers/params-helper';

@Injectable({
  providedIn: 'root'
})
export class ConversationService{


  private readonly http = inject(HttpClient);
  private readonly baseUrl: string = environment.CONVERSATION_API ?? '';

  // Active chat state using Angular Signals
  readonly activeConversation = signal<ConversationResponse | null>(null);


  readonly currentPage = signal<number>(0);
  readonly isLastPage = signal<boolean>(false);
  readonly isLoadingMore = signal<boolean>(false);


  // Reset pagination state when switching chats
  resetPagination(): void {
    this.currentPage.set(0);
    this.isLastPage.set(false);
    this.isLoadingMore.set(false);
  }

  /**
   * Fetch all conversation threads for the authenticated user.
   */
  getUserConversations(filters?: ConversationFilterRequest): Observable<ApiResponse<ConversationResponse[]>> {
    const params = buildParams({filters});
    return this.http.get<ApiResponse<ConversationResponse[]>>(this.baseUrl, { params });
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
  getConversationMessages(
    conversationId: number, page: number = 0, size: number = 30): Observable<PaginatedApiResponse<ChatMessageResponse>> {

    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PaginatedApiResponse<ChatMessageResponse>>(`${this.baseUrl}/${conversationId}/messages`, { params });
  }

  /**
   * Clean up active room subscription when leaving the chat view
   */
  leaveConversation(): void {
    const activeConv = this.activeConversation();

    if (activeConv) {
      this.http.post<ApiResponse<void>>(`${this.baseUrl}/${activeConv.id}/leave`, {}).subscribe({
        error: (error) => {
          console.error('Failed to leave conversation:', error);
        }
      });


      this.activeConversation.set(null);
    }
  }
}
