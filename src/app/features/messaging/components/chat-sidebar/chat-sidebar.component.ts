import {Component, inject, input, output, signal, OnInit} from '@angular/core';
import {ConversationResponse} from '@features/messaging/dtos/responses/conversation-response';
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
  conversationSelected = output<ConversationResponse>();

  private readonly conversationService = inject(ConversationService);
  private readonly alertService = inject(AlertService);

  protected conversations = signal<ConversationResponse[]>([]);
  protected activeConversation = this.conversationService.activeConversation;
  protected isLoadingConversations = signal<boolean>(false);



  protected searchInput = signal('');
  private readonly searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.loadUserConversations();
    this.setupSearchSubscription();
  }

  /**
   * Loads the user's conversations from the server and updates the component state.
   * @private
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

  /**
   * Sets up a subscription to the search input, which will trigger a search for conversations after a debounce period.
   * This prevents excessive API calls while the user is typing.
   * @private
   */
  private setupSearchSubscription(): void {
    this.searchSubject
      .pipe(
        debounceTime(300), // Wait 300ms after the user stops typing
        distinctUntilChanged(), // Only trigger if the search term actually changed
        switchMap((searchTerm) => {
          this.isLoadingConversations.set(true);
          return this.conversationService.getUserConversations({
            searchTerm: searchTerm.trim(),
          });
        }),
      )
      .subscribe({
        next: (res) => {
          if (res.data) {
            this.conversations.set(res.data);
          }
          this.isLoadingConversations.set(false);
        },
        error: (err) => {
          this.isLoadingConversations.set(false);
          this.alertService.triggerErrorAlert(
            err.error?.message || 'Failed to search conversations.',
          );
        },
      });
  }

  /**
   * Handles the search input change event.
   * @param value The new search term.
   * @private
   */
  protected onSearchInput(value: string): void {
    this.searchInput.set(value);
    this.searchSubject.next(value);
  }


}
