import {Component, inject, signal, OnInit} from '@angular/core';
import {LucideAngularModule, Search} from 'lucide-angular';
import {FormsModule} from '@angular/forms';
import {ConversationService} from '@features/messaging/services/conversation/conversation.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {debounceTime, distinctUntilChanged, Subject, switchMap} from 'rxjs';

@Component({
  selector: 'app-conversation-search',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './conversation-search.component.html',
  styleUrl: './conversation-search.component.css'
})
export class ConversationSearchComponent implements OnInit {

  private readonly conversationService = inject(ConversationService);
  private readonly alertService = inject(AlertService);

  protected conversations = this.conversationService.userConversations;
  protected isLoadingConversations = this.conversationService.userConversationsLoading;

  protected searchInput = signal('');
  private readonly searchSubject = new Subject<string>();

  ngOnInit():void{
    this.setupSearchSubscription();
  }

  /**
   * Sets up a subscription to the search input, which will trigger a search for conversations after a debounce period.
   * This prevents excessive API calls while the user is typing.
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
          this.alertService.triggerErrorAlert(err.error?.message || 'Failed to search conversations.',);
        },
      });
  }

  /**
   * Handles the search input change event.
   * @param value The new search term.
   */
  protected onSearch(value: string): void {
    this.searchInput.set(value);
    this.searchSubject.next(value);
  }

  protected readonly Search = Search;
}
