import {MessageDeliveryStatusUpdate} from '@features/messaging/enums/message-delivery-status-update';

export class UpdateDeliveryStatusRequest {
  conversationId!: number;
  messageIds!: number[];
  status!: MessageDeliveryStatusUpdate;
}
