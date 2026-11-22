import {Component, inject, output, signal, OnInit} from '@angular/core';
import {
  ConversationSearchComponent
} from '@features/messaging/components/conversation-search/conversation-search.component';
import {ConversationListComponent} from '@features/messaging/components/conversation-list/conversation-list.component';
import {ConversationService} from '@features/messaging/services/conversation/conversation.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {debounceTime, distinctUntilChanged, Subject, switchMap} from 'rxjs';

@Component({
  selector: 'app-chat-sidebar',
  imports: [
    ConversationSearchComponent,
    ConversationListComponent
  ],
  templateUrl: './chat-sidebar.component.html',
  styleUrl: './chat-sidebar.component.css'
})
export class ChatSidebarComponent implements OnInit {
  loadInitialMessages = output<number>();
  markActiveConversationAsRead = output<void>();

  private readonly conversationService = inject(ConversationService);

  protected conversations = this.conversationService.userConversations;
  protected isLoadingConversations = this.conversationService.userConversationsLoading;

  ngOnInit(): void {
    this.loadUserConversations();
  }

  /**
   * Loads the user's conversations from the server and updates the component state.
   */
  private loadUserConversations(): void {
    this.isLoadingConversations.set(true);
    this.conversationService.getUserConversations().subscribe({
      next: (res) => {
        if (res.data) {
          this.conversations.set(res.data);
        }
        this.isLoadingConversations.set(false);
      },
      error: () => {
        this.isLoadingConversations.set(false);
      },
    });
  }
}
