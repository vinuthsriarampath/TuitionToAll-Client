import {MessageDeliveryStatus} from '@features/messaging/enums/message-delivery-status';
import {MessageAttachmentResponse} from '@features/messaging/dtos/responses/message-attachment-response';

export class ChatMessageResponse {
  id!: number;
  conversationId!: number;
  senderId!: number;
  senderName!: string;
  senderDp!: string;
  content!: string;
  deliveryStatus!: MessageDeliveryStatus;
  isEdited!: boolean;
  isDeleted!: boolean;
  sentAt!: string;
  attachments!: MessageAttachmentResponse[];
}
