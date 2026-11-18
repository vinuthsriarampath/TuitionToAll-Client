import { MessageDeliveryStatus } from "@features/messaging/enums/message-delivery-status";

export class MessageReceiptResponse {
    recipientId!: number;
    recipientName!: string;
    status!: MessageDeliveryStatus
    deliveredAt?: string | null;
    readAt?: string | null;
}