import {MessageAttachmentType} from '@features/messaging/enums/message-attachment-type';

export class TempMessageAttachmentResponse{
  fileUrl!: string;
  fileName!: string;
  fileType!: MessageAttachmentType;
  fileSize!: number;
}
