import {MessageDeliveryStatus} from '@features/messaging/enums/message-delivery-status';
import {MessageAttachmentResponse} from '@features/messaging/dtos/responses/message-attachment-response';
import { MessageReceiptResponse } from './message-receipt-response';

export class ChatMessageResponse {
  id!: number;
  conversationId!: number;
  senderId!: number;
  senderName!: string;
  senderDp!: string;
  content!: string;
  receipts!: MessageReceiptResponse[];
  isEdited!: boolean;
  isDeleted!: boolean;
  sentAt!: string;
  attachments!: MessageAttachmentResponse[];
}
