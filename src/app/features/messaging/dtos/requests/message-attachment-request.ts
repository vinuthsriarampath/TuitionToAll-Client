import {MessageAttachmentType} from '@features/messaging/enums/message-attachment-type';

export class MessageAttachmentRequest {
  fileUrl!: string;
  fileName!: string;
  fileType!: MessageAttachmentType;
  fileSize!: number;
}
