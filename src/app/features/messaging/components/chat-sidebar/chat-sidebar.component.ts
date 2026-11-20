import {Component, input, output} from '@angular/core';
import {ConversationResponse} from '@features/messaging/dtos/responses/conversation-response';
import {
  ConversationSearchComponent
} from '@features/messaging/components/conversation-search/conversation-search.component';
import {ConversationListComponent} from '@features/messaging/components/conversation-list/conversation-list.component';

@Component({
  selector: 'app-chat-sidebar',
  imports: [
    ConversationSearchComponent,
    ConversationListComponent
  ],
  templateUrl: './chat-sidebar.component.html',
  styleUrl: './chat-sidebar.component.css'
})
export class ChatSidebarComponent {
  conversations = input.required<ConversationResponse[]>();

  activeConversationId = input<number | null>(null);

  unreadMap = input.required<Map<number, number>>();

  isLoading = input<boolean>(false);

  searchTerm = input<string>('');

  conversationSelected = output<ConversationResponse>();

  searchTermChange = output<string>();
}
