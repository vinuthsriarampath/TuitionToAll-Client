import {inject, Injectable, OnInit, signal} from '@angular/core';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {ChatMessageResponse} from '@features/messaging/dtos/responses/chat-message-response';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConversationResponse} from '@features/messaging/dtos/responses/conversation-response';
import {ApiResponse} from '@shared/utils/response/api-response';
import {environment} from '@env/environment.development';
import {StompClientService} from '@core/services/stomp/stomp-client.service';
import {SendMessageRequest} from '@features/messaging/dtos/requests/send-message-request';
import {MessageDeliveryStatusUpdate} from '@features/messaging/enums/message-delivery-status-update';
import {UserService} from '@features/user/services/user/user.service';
import {User} from '@features/user/dtos/responses/user';
import {UpdateDeliveryStatusRequest} from '@features/messaging/dtos/requests/update-delivery-status-request';

@Injectable({
  providedIn: 'root'
})
export class ConversationService{


  private readonly http = inject(HttpClient);
  private readonly userService = inject(UserService);
  private readonly baseUrl: string = environment.CONVERSATION_API ?? '';
  private readonly stompClient = inject(StompClientService);

  readonly unreadMap = signal(new Map());

  // Active chat state using Angular Signals
  readonly activeConversation = signal<ConversationResponse | null>(null);
  readonly activeMessages = signal<ChatMessageResponse[]>([]);

  private activeTopicDestination?: string;

  protected currentUser = signal<User | null>(null);


  constructor() {
    this.currentUser.set(this.userService.getCurrentUser());
  }

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
  getConversationMessages(
    conversationId: number, page: number = 0, size: number = 30): Observable<PaginatedApiResponse<ChatMessageResponse>> {

    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get<PaginatedApiResponse<ChatMessageResponse>>(`${this.baseUrl}/${conversationId}/messages`, { params });
  }

  /**
   * Connect to WebSocket topic for a specific conversation room
   */
  subscribeToConversation(conversation: ConversationResponse): void {
    // Unsubscribe from existing active topic if switching rooms
    if (this.activeTopicDestination) {
      this.stompClient.unsubscribe(this.activeTopicDestination);
    }

    this.activeConversation.set(conversation);
    this.activeTopicDestination = `/topic/chat/${conversation.id}`;

    // Subscribe to STOMP destination
    this.stompClient.subscribe(this.activeTopicDestination, (message) => {
      const incomingMessage = JSON.parse(message.body) as ChatMessageResponse;

      // Append new incoming message to reactive signal array
      this.activeMessages.update((messages) => [...messages, incomingMessage]);

      // If viewing the chat and a message arrives from someone else, mark it as 'READ' immediately
      const currentUser = this.currentUser();
      if (currentUser && incomingMessage.senderId !== currentUser.id) {
        this.sendDeliveryStatusUpdate(conversation.id, [incomingMessage.id], MessageDeliveryStatusUpdate.READ);
      }
    });

    // 2. Listen for real-time delivery status updates ('DELIVERED', 'READ')
    this.stompClient.subscribe(`${this.activeTopicDestination}/status`, (statusMsg) => {
      const update = JSON.parse(statusMsg.body) as UpdateDeliveryStatusRequest;

      // Update local signal array status flags
      this.activeMessages.update(messages =>
        messages.map(m => update.messageIds.includes(m.id) ? { ...m, deliveryStatus: update.status as any } : m)
      );
    });
  }

  /**
   * Publish status updates over WebSocket
   */
  sendDeliveryStatusUpdate(conversationId: number, messageIds: number[], status: MessageDeliveryStatusUpdate): void {
    if (!this.stompClient.connected() || messageIds.length === 0) return;

    this.stompClient['client'].publish({
      destination: '/app/chat.status',
      body: JSON.stringify({ conversationId, messageIds, status })
    });
  }

  /**
   * Send a message through WebSocket destination /app/chat.send
   */
  sendMessage(payload: SendMessageRequest): void {
    if (!this.stompClient.connected()) {
      console.warn('[ChatService] Cannot send message: STOMP client disconnected');
      return;
    }

    // Publish payload over STOMP client
    this.stompClient['client'].publish({
      destination: '/app/chat.send',
      body: JSON.stringify(payload)
    });
  }

  /**
   * Clean up active room subscription when leaving the chat view
   */
  leaveConversation(): void {
    if (this.activeTopicDestination) {
      this.stompClient.unsubscribe(this.activeTopicDestination);
      this.activeTopicDestination = undefined;
    }
    this.activeConversation.set(null);
    this.activeMessages.set([]);
  }


  /**
   * Initialize unread counts map from loaded conversations list
   */
  setInitialUnreadCounts(conversations: ConversationResponse[]): void {
    const map = new Map<number, number>();
    conversations.forEach(c => map.set(c.id, c.unreadCount ?? 0));
    this.unreadMap.set(map);
  }

  /**
   * Increment unread count for a specific conversation when background notification arrives
   */
  incrementUnread(conversationId: number): void {
    this.unreadMap.update(map => {
      const newMap = new Map(map);
      const current = newMap.get(conversationId) ?? 0;
      newMap.set(conversationId, current + 1);
      return newMap;
    });
  }

  /**
   * Clear unread count when user opens/views a conversation
   */
  clearUnread(conversationId: number): void {
    this.unreadMap.update(map => {
      const newMap = new Map(map);
      newMap.set(conversationId, 0);
      return newMap;
    });

    // Call backend REST to persist last_read_at timestamp update
    this.http.post<ApiResponse<void>>(`${this.baseUrl}/${conversationId}/read`, {}).subscribe();
  }
}
