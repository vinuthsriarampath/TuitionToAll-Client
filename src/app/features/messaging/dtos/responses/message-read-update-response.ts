import { MessageDeliveryStatus } from "@features/messaging/enums/message-delivery-status";

export class MessageReadUpdateResponse {
    conversationId!: number;
    readerId!: number;
    lastReadMessageId!: number;
    status!: MessageDeliveryStatus;
    readAt!: string;
}