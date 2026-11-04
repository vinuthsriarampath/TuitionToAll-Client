import {MessageAttachmentType} from '@features/messaging/enums/message-attachment-type';

export class MessageAttachmentResponse {
  id!: number;
  fileUrl!: string;
  fileName!: string;
  fileType!: MessageAttachmentType;
  fileSize!: number;
}
