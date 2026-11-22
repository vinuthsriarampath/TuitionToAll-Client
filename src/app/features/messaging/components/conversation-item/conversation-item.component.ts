import {Component, inject, input, output} from '@angular/core';
import {ConversationResponse} from '@features/messaging/dtos/responses/conversation-response';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {environment} from '@env/environment.development';
import {ConversationService} from '@features/messaging/services/conversation/conversation.service';
import {
  ConversationMessageService
} from '@features/messaging/services/conversation-message/conversation-message.service';

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

  loadInitialMessages = output<number>();
  leaveActiveConversation = output<void>();

  private readonly conversationService = inject(ConversationService);
  private readonly conversationMessageService = inject(ConversationMessageService)

  private readonly activeConversation = this.conversationService.activeConversation;

  protected selectConversation(): void {
    if (this.activeConversation()?.id === this.conversation().id) return;

    // Leave the previous conversation.
    if (this.activeConversation()?.id) {
      this.leaveActiveConversation.emit();
    }

    // Set the active conversation.
    this.conversationService.activeConversation.set(this.conversation());

    // Subscribe to the new conversation's WebSocket destinations.
    this.conversationMessageService.subscribeToConversation(this.conversation());

    this.loadInitialMessages.emit(this.conversation().id);
  }

  protected readonly environment = environment;
}
