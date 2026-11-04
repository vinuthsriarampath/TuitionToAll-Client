import {MessageAttachmentRequest} from '@features/messaging/dtos/requests/message-attachment-request';

export class SendMessageRequest {
  conversationId!: number;
  content!: string;
  attachments!: MessageAttachmentRequest[];
}
