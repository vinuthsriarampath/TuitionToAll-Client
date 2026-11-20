import {Component, input, output} from '@angular/core';
import {ConversationResponse} from '@features/messaging/dtos/responses/conversation-response';
import {LucideAngularModule, MessageSquare} from 'lucide-angular';
import {ConversationItemComponent} from '@features/messaging/components/conversation-item/conversation-item.component';

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

  unreadMap = input.required<Map<number, number>>();

  isLoading = input<boolean>(false);

  conversationSelected = output<ConversationResponse>();

  protected readonly MessageSquare = MessageSquare;
}
