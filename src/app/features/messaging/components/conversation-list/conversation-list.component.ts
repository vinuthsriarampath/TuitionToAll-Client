import {Component, HostListener, inject, OnDestroy, output} from '@angular/core';
import {LucideAngularModule, MessageSquare} from 'lucide-angular';
import {ConversationItemComponent} from '@features/messaging/components/conversation-item/conversation-item.component';
import {ConversationUnreadService} from '@features/messaging/services/conversation-unread/conversation-unread.service';
import { ConversationService } from '@features/messaging/services/conversation/conversation.service';
import { ConversationMessageService } from '@features/messaging/services/conversation-message/conversation-message.service';

@Component({
  selector: 'app-conversation-list',
  imports: [
    LucideAngularModule,
    ConversationItemComponent
  ],
  templateUrl: './conversation-list.component.html',
  styleUrl: './conversation-list.component.css'
})
export class ConversationListComponent implements OnDestroy{

  loadInitialMessages = output<number>();
  markActiveConversationAsRead = output<void>();

  private readonly conversationService = inject(ConversationService);
  private readonly conversationMessageService = inject(ConversationMessageService)
  private readonly conversationUnreadService = inject(ConversationUnreadService);

  protected conversations = this.conversationService.userConversations;
  protected activeConversation = this.conversationService.activeConversation;
  protected isConversationsLoading = this.conversationService.userConversationsLoading;
  protected unreadMap = this.conversationUnreadService.unreadMap;

  ngOnDestroy(): void {
    if(this.activeConversation()){
      this.leaveActiveConversation();
    }
  }

  protected leaveActiveConversation(): void {
    const conversation = this.activeConversation();

    if (!conversation) return;

    // Acknowledge messages only if the user is currently viewing the latest messages.
    this.markActiveConversationAsRead.emit();

    // Unsubscribe and leave the previous conversation.
    this.conversationMessageService.unsubscribeFromConversation();
    this.conversationService.leaveConversation();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.leaveActiveConversation();
  }

  protected readonly MessageSquare = MessageSquare;
}
