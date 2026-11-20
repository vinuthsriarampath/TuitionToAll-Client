import {Component, input, output} from '@angular/core';
import {ConversationResponse} from '@features/messaging/dtos/responses/conversation-response';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {environment} from '@env/environment.development';

@Component({
  selector: 'app-conversation-item',
  imports: [
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './conversation-item.component.html',
  styleUrl: './conversation-item.component.css'
})
export class ConversationItemComponent {
  conversation = input.required<ConversationResponse>();

  isActive = input<boolean>(false);

  unreadCount = input<number>(0);

  selected = output<ConversationResponse>();

  protected selectConversation(): void {
    this.selected.emit(this.conversation());
  }

  protected readonly environment = environment;
}
