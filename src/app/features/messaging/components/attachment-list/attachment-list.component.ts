import {Component, input, Input} from '@angular/core';
import {MessageAttachmentResponse} from '@features/messaging/dtos/responses/message-attachment-response';
import {AttachmentItemComponent} from '@features/messaging/components/attachment-item/attachment-item.component';

@Component({
  selector: 'app-attachment-list',
  imports: [
    AttachmentItemComponent
  ],
  templateUrl: './attachment-list.component.html',
  styleUrl: './attachment-list.component.css'
})
export class AttachmentListComponent {

  attachments = input<MessageAttachmentResponse[]>([]);
}
