import { ChatNotificationType } from "@features/messaging/enums/chat-notification-type";

export class ChatNotificationResponse {
    type!: ChatNotificationType;
    conversationId!: number;
    messageId?: number;
}
