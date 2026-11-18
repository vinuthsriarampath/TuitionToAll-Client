import { inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AcknowledgeMessageDeliveryRequest } from '@features/messaging/dtos/requests/acknowledge-message-delivery-request';
import { StompClientService } from '@core/services/stomp/stomp-client.service';
import { DeleteMessageRequest } from '@features/messaging/dtos/requests/delete-message-request';
import { EditMessageRequest } from '@features/messaging/dtos/requests/edit-message-request';
import { SendMessageRequest } from '@features/messaging/dtos/requests/send-message-request';
import { ChatMessageResponse } from '@features/messaging/dtos/responses/chat-message-response';
import { ConversationResponse } from '@features/messaging/dtos/responses/conversation-response';
import { MessageDeliveryUpdateResponse } from '@features/messaging/dtos/responses/message-delivery-update-response';
import { MessageReadUpdateResponse } from '@features/messaging/dtos/responses/message-read-update-response';
import { MessageReceiptResponse } from '@features/messaging/dtos/responses/message-receipt-response';
import { MessageReceiptsResponse } from '@features/messaging/dtos/responses/message-receipts-response';
import { MessageDeliveryStatus } from '@features/messaging/enums/message-delivery-status';
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

  private activeSubscriptions: {
    destination: string;
    subscriptionId: number;
  }[] = [];

  private activeConversationId: number | null = null;

  // Stores receipts that arrive before their corresponding message.
  private pendingReceipts = new Map<string, MessageReceiptResponse[]>();

  constructor() {
    this.newMessageAudio.load();
  }

  /**
   * Subscribe to all WebSocket destinations for a conversation.
   */
  subscribeToConversation(conversation: ConversationResponse): void {

    this.unsubscribeFromConversation();

    this.activeConversationId = conversation.id;

    const destination = `/topic/chat/${conversation.id}`;

    // 1. Listen for incoming messages.
    const messageSubscriptionId = this.stompClient.subscribe(destination,(message) => {
        const incomingMessage = JSON.parse(message.body ) as ChatMessageResponse;

        console.log('[ChatService] Received message:', incomingMessage);

        const pendingReceipts = this.getPendingReceipts( conversation.id, incomingMessage.id);

        const messageWithReceipts: ChatMessageResponse = {
          ...incomingMessage,
          receipts: pendingReceipts.length > 0
            ? pendingReceipts
            : incomingMessage.receipts ?? []
        };

        this.activeMessages.update(messages => {
          const exists = messages.some(
            existing => existing.id === messageWithReceipts.id
          );

          if (exists) {
            return messages.map(existing =>
              existing.id === messageWithReceipts.id
                ? { ...existing, ...messageWithReceipts }
                : existing
            );
          }

          return [...messages, messageWithReceipts];
        });

        const currentUser = this.currentUser();

        if (messageWithReceipts.senderId !== currentUser?.id) {
          this.playNewMessageSound();
        }
      }
    );

    this.addNewSubscriptions(destination, messageSubscriptionId);

    // 2. Listen for delivery updates.
    const deliveryDestination = `${destination}/delivery`;

    const deliverySubscriptionId = this.stompClient.subscribe( deliveryDestination, (message) => { 
        const update = JSON.parse( message.body) as MessageDeliveryUpdateResponse;

        this.updateReceiptStatuses(
          update.conversationId,
          update.messageIds,
          update.recipientId,
          update.status,
          update.deliveredAt
        );
      }
    );

    this.addNewSubscriptions(
      deliveryDestination,
      deliverySubscriptionId
    );

    // 3. Listen for read updates.
    const readDestination = `${destination}/read`;

    const readSubscriptionId = this.stompClient.subscribe(
      readDestination,
      (message) => {
        const update = JSON.parse(
          message.body
        ) as MessageReadUpdateResponse;

        this.updateReceiptStatuses(
          update.conversationId,
          this.activeMessages()
            .filter(msg =>
              msg.conversationId === update.conversationId &&
              msg.id <= update.lastReadMessageId
            )
            .map(msg => msg.id),
          update.readerId,
          update.status,
          update.readAt
        );
      }
    );

    this.addNewSubscriptions(readDestination, readSubscriptionId);

    // 4. Listen for the sender's initial message receipts.
    const receiptsDestination = '/user/queue/chat-receipts';

    const receiptsSubscriptionId = this.stompClient.subscribe( receiptsDestination, (message) => {
        const update = JSON.parse( message.body ) as MessageReceiptsResponse;

        if (update.conversationId !== this.activeConversationId) {
          return;
        }

        this.updateMessageReceipts( update.conversationId, update.messageId, update.receipts );
      }
    );

    this.addNewSubscriptions( receiptsDestination, receiptsSubscriptionId);

    // 5. Listen for deleted messages.
    const deleteDestination = `${destination}/delete`;

    const deleteSubscriptionId = this.stompClient.subscribe(deleteDestination, (message) => { const update = JSON.parse( message.body ) as ChatMessageResponse;

        this.activeMessages.update(messages =>
          messages.map(existing =>
            existing.id === update.id && update.isDeleted
              ? update
              : existing
          )
        );
      }
    );

    this.addNewSubscriptions( deleteDestination, deleteSubscriptionId );

    // 6. Listen for edited messages.
    const editDestination = `${destination}/edit`;

    const editSubscriptionId = this.stompClient.subscribe(editDestination, (message) => {
        const update = JSON.parse( message.body ) as ChatMessageResponse;

        this.activeMessages.update(messages =>
          messages.map(existing =>
            existing.id === update.id && update.isEdited
              ? update
              : existing
          )
        );
      }
    );

    this.addNewSubscriptions(editDestination, editSubscriptionId);
  }

  /**
   * Merge historical messages with messages received through WebSocket.
   */
  setInitialMessages(messages: ChatMessageResponse[]): void {
    this.activeMessages.update(currentMessages => {
      const messageMap = new Map<number, ChatMessageResponse>();

      // Preserve messages already received through WebSocket.
      currentMessages.forEach(message => {
        messageMap.set(message.id, message);
      });

      // Add historical messages without overwriting newer WebSocket data.
      messages.forEach(message => {
        if (!messageMap.has(message.id)) {
          messageMap.set(message.id, message);
        }
      });

      // Apply any receipts that arrived before their messages.
      messageMap.forEach((message, messageId) => {
        const pending = this.getPendingReceipts( message.conversationId, messageId );

        if (pending.length > 0) {
          messageMap.set(messageId, {
            ...message,
            receipts: pending
          });
        }
      });

      return Array.from(messageMap.values())
        .sort((a, b) =>
          new Date(a.sentAt).getTime() -
          new Date(b.sentAt).getTime()
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
    this.activeConversationId = null;
    this.pendingReceipts.clear();

    this.activeMessages.set([]);
  }

  /**
   * Acknowledge that messages have been delivered to the current user.
   */
  acknowledgeMessageDelivery(conversationId: number, messageIds: number[] ): void {

    if (messageIds.length === 0) {
      return;
    }

    const payload: AcknowledgeMessageDeliveryRequest = { conversationId, messageIds };

    if (!this.stompClient.publish('/app/chat.delivery', payload)) {
      console.warn( '[ChatService] Cannot acknowledge message delivery: STOMP client disconnected' );
    }
  }

  /**
   * Send a message via STOMP.
   */
  sendMessage(payload: SendMessageRequest): void {
    if (!this.stompClient.publish('/app/chat.send', payload)) {
      console.warn('[ChatService] Cannot send message: STOMP client disconnected');
    }
  }

  /**
   * Delete a message via STOMP.
   */
  deleteMessage(payload: DeleteMessageRequest): void {
  if (!this.stompClient.publish('/app/chat.delete', payload)) {
    console.warn('[ChatService] Cannot delete message: STOMP client disconnected');
  }
}

  /**
   * Edit a message via STOMP.
   */
  editMessage(payload: EditMessageRequest): void {
    if (!this.stompClient.publish('/app/chat.edit', payload)) {
      console.warn('[ChatService] Cannot edit message: STOMP client disconnected');
    }
  }

  /**
   * Update receipts for a specific message.
   */
  private updateMessageReceipts( conversationId: number, messageId: number, receipts: MessageReceiptResponse[] ): void {

    const messageExists = this.activeMessages().some(
      message =>
        message.id === messageId &&
        message.conversationId === conversationId
    );

    if (!messageExists) {
      this.pendingReceipts.set(
        this.getReceiptKey(conversationId, messageId),
        receipts
      );

      return;
    }

    this.activeMessages.update(messages =>
      messages.map(message =>
        message.id === messageId &&
        message.conversationId === conversationId
          ? { ...message, receipts }
          : message
      )
    );
  }

  /**
   * Update receipt statuses for one or more messages.
   */
  private updateReceiptStatuses( conversationId: number, messageIds: number[], recipientId: number, status: MessageDeliveryStatus, timestamp?: string ): void {

    if (messageIds.length === 0) return;

    this.activeMessages.update(messages => messages.map(msg => {
      if (msg.conversationId !== conversationId || !messageIds.includes(msg.id)) {
        return msg;
      }

      return {
        ...msg,
        receipts: msg.receipts.map(receipt => {
          if (receipt.recipientId !== recipientId) return receipt;

          return {
            ...receipt,
            status,
            ...(status === MessageDeliveryStatus.DELIVERED && timestamp
              ? { deliveredAt: timestamp }
              : {}),
            ...(status === MessageDeliveryStatus.READ && timestamp
              ? { readAt: timestamp }
              : {})
          };
        })
      };
    })
  );
  }

  /**
   * Retrieve and remove pending receipts.
   */
  private getPendingReceipts(conversationId: number, messageId: number): MessageReceiptResponse[] {

    const key = this.getReceiptKey(conversationId, messageId);
    const receipts = this.pendingReceipts.get(key) ?? [];

    this.pendingReceipts.delete(key);

    return receipts;
  }

  /**
   * Get a unique key for storing message receipts.
   * @param conversationId The ID of the conversation.
   * @param messageId The ID of the message.
   * @returns A unique key for the message receipt.
   */
  private getReceiptKey(conversationId: number,messageId: number): string {
    return `${conversationId}:${messageId}`;
  }

  private playNewMessageSound(): void {
    this.newMessageAudio.currentTime = 0;

    this.newMessageAudio.play().catch(error => {
      console.warn('Audio playback prevented by browser policy:',error);
    });
  }

  private addNewSubscriptions(destination: string,subscriptionId: number): void {
    this.activeSubscriptions.push({
      destination,
      subscriptionId
    });
  }
}
