import {Component, effect, inject, input, output, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChatMessageResponse} from '@features/messaging/dtos/responses/chat-message-response';
import {ConversationService} from '@features/messaging/services/conversation/conversation.service';
import {
  ConversationMessageService
} from '@features/messaging/services/conversation-message/conversation-message.service';

@Component({
  selector: 'app-message-edit',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent{
  editingMessageId = input.required<number | null>();
  message = input.required<ChatMessageResponse>();

  cancelEdit = output<void>();

  private readonly conversationService = inject(ConversationService);
  private readonly conversationMessageService = inject(ConversationMessageService);

  private readonly activeConversation = this.conversationService.activeConversation;

  protected editContentInput = signal<string>('');

  constructor() {
    effect(() => {
      this.editContentInput.set(this.message().content);
    });
  }

  protected submitEdit(messageId: number): void {
    const activeConv = this.activeConversation();
    const content = this.editContentInput().trim();
    if (!activeConv || !content) return;

    this.conversationMessageService.editMessage({
      conversationId: activeConv.id,
      messageId: messageId,
      newContent: content,
    });

    this.cancelEditing();
  }

  cancelEditing(): void {
    this.editContentInput.set('');
    this.cancelEdit.emit();
  }
}
