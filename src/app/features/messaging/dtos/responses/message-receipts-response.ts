import { MessageReceiptResponse } from "./message-receipt-response";

export class MessageReceiptsResponse {
    conversationId!: number;
    messageId!: number;
    receipts!: MessageReceiptResponse[];
}
