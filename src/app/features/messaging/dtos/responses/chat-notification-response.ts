import { ConversationEventType } from "@features/messaging/enums/chat-notification-type";

export class ChatNotificationResponse {
    type!: ConversationEventType;
    conversationId!: number;
    messageId?: number;
}
