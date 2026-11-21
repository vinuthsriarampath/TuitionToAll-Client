import {Component, inject, input, output} from '@angular/core';
import {ConversationResponse} from '@features/messaging/dtos/responses/conversation-response';
import {LucideAngularModule, MessageSquare} from 'lucide-angular';
import {ConversationItemComponent} from '@features/messaging/components/conversation-item/conversation-item.component';
import {ConversationUnreadService} from '@features/messaging/services/conversation-unread/conversation-unread.service';

@Component({
  selector: 'app-conversation-list',
  imports: [
    LucideAngularModule,
    ConversationItemComponent
  ],
  templateUrl: './conversation-list.component.html',
  styleUrl: './conversation-list.component.css'
})
export class ConversationListComponent {
  conversations = input.required<ConversationResponse[]>();

  activeConversationId = input<number | null>(null);

  isLoading = input<boolean>(false);

  conversationSelected = output<ConversationResponse>();

  private readonly conversationUnreadService = inject(ConversationUnreadService);

  protected unreadMap = this.conversationUnreadService.unreadMap;

  protected readonly MessageSquare = MessageSquare;
}
