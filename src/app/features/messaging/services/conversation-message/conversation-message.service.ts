import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { StompClientService } from '@core/services/stomp/stomp-client.service';
import { DeleteMessageRequest } from '@features/messaging/dtos/requests/delete-message-request';
import { EditMessageRequest } from '@features/messaging/dtos/requests/edit-message-request';
import { SendMessageRequest } from '@features/messaging/dtos/requests/send-message-request';
import { UpdateDeliveryStatusRequest } from '@features/messaging/dtos/requests/update-delivery-status-request';
import { ChatMessageResponse } from '@features/messaging/dtos/responses/chat-message-response';
import { ConversationResponse } from '@features/messaging/dtos/responses/conversation-response';
import { MessageDeliveryStatusUpdate } from '@features/messaging/enums/message-delivery-status-update';
import { User } from '@features/user/dtos/responses/user';
import { UserService } from '@features/user/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationMessageService {

  private readonly stompClient = inject(StompClientService);
  private readonly userService = inject(UserService);

  readonly activeMessages = signal<ChatMessageResponse[]>([]);

  private readonly currentUser = toSignal(
    this.userService.currentUser$,
    { initialValue: null }
  );

  private readonly newMessageAudio = new Audio('audio/new-message.mp3');

  private activeSubscriptions: {destination: string;subscriptionId: number;}[] = [];

  constructor() {
    this.newMessageAudio.load();
  }

  /**
   * Subscribe to all WebSocket destinations for a conversation.
   */
  subscribeToConversation(conversation: ConversationResponse): void {

    // Remove previous conversation subscriptions.
    this.unsubscribeFromConversation();

    const destination = `/topic/chat/${conversation.id}`;

    // Listen for incoming messages.
    const subscriptionId = this.stompClient.subscribe(destination, (message) => {
      const incomingMessage = JSON.parse(message.body) as ChatMessageResponse;

      this.activeMessages.update(messages => [
        ...messages,
        incomingMessage
      ]);

      const currentUser = this.currentUser();

      if (incomingMessage.senderId !== currentUser?.id) {
        this.playNewMessageSound();

        this.sendDeliveryStatusUpdate(
          conversation.id,
          [incomingMessage.id],
          MessageDeliveryStatusUpdate.READ
        );
      }
    });

    this.addNewSubscriptions(destination, subscriptionId);

    // Listen for delivery status updates.
    const statusSubscriptionId = this.stompClient.subscribe(`${destination}/status`, (statusMsg) => {
      const update = JSON.parse(statusMsg.body) as UpdateDeliveryStatusRequest;

      this.activeMessages.update(messages =>
        messages.map(message =>
          update.messageIds.includes(message.id)
            ? { ...message, deliveryStatus: update.status as any }
            : message
        )
      );
    });

    this.addNewSubscriptions(`${destination}/status`, statusSubscriptionId);

    // Listen for deleted messages.
    const deleteSubscriptionId = this.stompClient.subscribe(`${destination}/delete`, (deletedMessage) => {
      const update = JSON.parse(deletedMessage.body) as ChatMessageResponse;

      this.activeMessages.update(messages =>
        messages.map(message =>
          update.id === message.id && update.isDeleted
            ? update
            : message
        )
      );
    });

    this.addNewSubscriptions(`${destination}/delete`, deleteSubscriptionId);

    // Listen for edited messages.
    const editSubscriptionId = this.stompClient.subscribe(`${destination}/edit`, (editedMessage) => {
      const update = JSON.parse(editedMessage.body) as ChatMessageResponse;

      this.activeMessages.update(messages =>
        messages.map(message =>
          update.id === message.id && update.isEdited
            ? update
            : message
        )
      );
    });

    this.addNewSubscriptions(`${destination}/edit`, editSubscriptionId);

  }

  setInitialMessages(messages: ChatMessageResponse[]): void {
    this.activeMessages.update(currentMessages => {
      const messageMap = new Map<number, ChatMessageResponse>();

      // Add messages already received through WebSocket.
      currentMessages.forEach(message => {
        messageMap.set(message.id, message);
      });

      // Add historical messages without overwriting newer WebSocket updates.
      messages.forEach(message => {
        if (!messageMap.has(message.id)) {
          messageMap.set(message.id, message);
        }
      });

      return Array.from(messageMap.values())
        .sort((a, b) =>
          new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
        );
    });
  }

  /**
   * Unsubscribe from every destination associated with the active conversation.
   */
  unsubscribeFromConversation(): void {
    this.activeSubscriptions.forEach(sub => {
      this.stompClient.unsubscribe(sub.destination,sub.subscriptionId);
    });

    this.activeSubscriptions = [];
    this.activeMessages.set([]);
  }

  /**
   * Send delivery status updates.
   * @param conversationId The ID of the conversation.
   * @param messageIds The IDs of the messages to update.
   * @param status The new delivery status.
   */
  sendDeliveryStatusUpdate(conversationId: number, messageIds: number[], status: MessageDeliveryStatusUpdate): void {
    if (messageIds.length === 0) return;

    this.stompClient.publish('/app/chat.status', {
      conversationId,
      messageIds,
      status
    });
  }

  /**
   * Send a message via STOMP.
   * @param payload The message payload to send.
   */
  sendMessage(payload: SendMessageRequest): void {
    if (!this.stompClient.publish('/app/chat.send', payload)) {
      console.warn('[ChatService] Cannot send message: STOMP client disconnected');
    }
  }

  /**
   * Delete a message via STOMP.
   * @param payload The message payload to delete.
   */
  deleteMessage(payload: DeleteMessageRequest): void {
  if (!this.stompClient.publish('/app/chat.delete', payload)) {
    console.warn('[ChatService] Cannot delete message: STOMP client disconnected');
  }
}

  /**
   * Edit a message via STOMP.
   * @param payload The message payload to edit.
   */
  editMessage(payload: EditMessageRequest): void {
    if (!this.stompClient.publish('/app/chat.edit', payload)) {
      console.warn('[ChatService] Cannot edit message: STOMP client disconnected');
    }
  }

  private playNewMessageSound(): void {
    this.newMessageAudio.currentTime = 0;

    this.newMessageAudio.play().catch(error => {
      console.warn('Audio playback prevented by browser policy:', error);
    });
  }

  private addNewSubscriptions(destination: string, subscriptionId: number): void {
    this.activeSubscriptions.push({
      destination,
      subscriptionId
    });
  }
}
