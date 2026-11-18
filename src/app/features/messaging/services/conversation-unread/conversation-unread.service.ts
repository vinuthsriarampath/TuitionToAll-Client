import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { StompClientService } from '@core/services/stomp/stomp-client.service';
import { environment } from '@env/environment.development';
import { ChatNotificationResponse } from '@features/messaging/dtos/responses/chat-notification-response';
import { ConversationResponse } from '@features/messaging/dtos/responses/conversation-response';
import { ChatNotificationType } from '@features/messaging/enums/chat-notification-type';
import { ApiResponse } from '@shared/utils/response/api-response';
import { Observable } from 'rxjs';
import { ConversationMessageService } from '../conversation-message/conversation-message.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationUnreadService {
  private readonly http = inject(HttpClient);
  private readonly stompClient = inject(StompClientService);
  private readonly conversationMessageService = inject(ConversationMessageService);

  private readonly baseUrl: string = environment.CONVERSATION_API ?? '';

  readonly unreadMap = signal<Map<number, number>>(new Map());
  readonly totalUnreadCount = signal<number>(0);

  constructor() {

    // Listen for private conversation events.
    this.stompClient.subscribe('/user/queue/chat-events', (message) => {
      const event = JSON.parse(message.body) as ChatNotificationResponse;

      switch (event.type) {
        case ChatNotificationType.MESSAGE_RECEIVED:{
          if (event.messageId != null) {
            this.conversationMessageService.acknowledgeMessageDelivery( event.conversationId, [event.messageId]);
          }

          this.refreshUnreadState();
          break;
        }
        case ChatNotificationType.CONVERSATION_READ:{
          this.refreshUnreadState();
          break;
        }
      }
    });

    // Synchronize unread state after initial connection and reconnections.
    effect(() => {
      if (this.stompClient.connected()) {
        this.refreshUnreadState();
      }
    });
  }

  getTotalUnreadCount(): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(`${this.baseUrl}/unread-count`);
  }

  refreshUnreadCount(): void {
    this.getTotalUnreadCount().subscribe({
      next: (response) => {
        this.totalUnreadCount.set(response.data ?? 0);
      },
      error: (error) => {
        console.error('Failed to refresh unread message count:', error);
      }
    });
  }

  refreshConversationUnreadCounts(): void {
    this.http.get<ApiResponse<ConversationResponse[]>>(this.baseUrl).subscribe({
      next: (response) => {
        const conversations = response.data ?? [];

        const updatedMap = new Map<number, number>();

        conversations.forEach(conversation => {
          updatedMap.set(
            conversation.id,
            conversation.unreadCount ?? 0
          );
        });

        this.unreadMap.set(updatedMap);
      },
      error: (error) => {
        console.error('Failed to refresh conversation unread counts:', error);
      }
    });
  }

  refreshUnreadState(): void {
    this.refreshUnreadCount();
    this.refreshConversationUnreadCounts();
  }

  markAsRead(conversationId: number, lastReadMessageId: number): void {
    if (lastReadMessageId <= 0) return;

    this.http.post<ApiResponse<void>>( `${this.baseUrl}/${conversationId}/read`, { lastReadMessageId } ).subscribe({
      error: (error) => {
        console.error('Failed to mark conversation as read:', error);
      }
    });
  }
}
