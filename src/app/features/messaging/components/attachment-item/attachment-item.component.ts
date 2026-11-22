import {Component, input} from '@angular/core';
import {MessageAttachmentResponse} from '@features/messaging/dtos/responses/message-attachment-response';
import {environment} from '@env/environment.development';
import {NgOptimizedImage} from '@angular/common';
import {LucideAngularModule, Paperclip} from 'lucide-angular';

@Component({
  selector: 'app-attachment-item',
  imports: [
    NgOptimizedImage,
    LucideAngularModule
  ],
  templateUrl: './attachment-item.component.html',
  styleUrl: './attachment-item.component.css'
})
export class AttachmentItemComponent {

  attachment = input.required<MessageAttachmentResponse>();
  protected readonly environment = environment;
  protected readonly Paperclip = Paperclip;
}
