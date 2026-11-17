import { MessageDeliveryStatus } from "@features/messaging/enums/message-delivery-status";

export class MessageDeliveryUpdateResponse {
    conversationId!: number;
    recipientId!: number;
    messageIds!: number[];
    status!: MessageDeliveryStatus;
}