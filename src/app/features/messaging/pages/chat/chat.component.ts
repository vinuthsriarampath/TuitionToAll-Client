import {Component, effect, ElementRef, HostListener, inject, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {ConversationResponse} from '@features/messaging/dtos/responses/conversation-response';
import {User} from '@features/user/dtos/responses/user';
import {ConversationService} from '@features/messaging/services/conversation/conversation.service';
import {UserService} from '@features/user/services/user/user.service';
import {
  Check,
  CheckCheck,
  ImageIcon,
  LucideAngularModule,
  MessageSquare,
  MoreVertical,
  Paperclip, Phone, Search,
  Send,
  Video
} from 'lucide-angular';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {environment} from '@env/environment.development';
import {CardShellComponent} from '@shared/ui';
import {ConversationType} from '@features/messaging/enums/conversation-type';
import {MessageDeliveryStatus} from '@features/messaging/enums/message-delivery-status';
import {MessageDeliveryStatusUpdate} from '@features/messaging/enums/message-delivery-status-update';

@Component({
  selector: 'app-chat',
  imports: [
    LucideAngularModule,
    FormsModule,
    DatePipe,
    NgOptimizedImage,
    CardShellComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy{

  private readonly conversationService = inject(ConversationService);
  private readonly userService = inject(UserService);

  protected conversations = signal<ConversationResponse[]>([]);
  protected isLoadingConversations = signal(false);
  protected isLoadingMessages = signal(false);
  protected messageInput = signal('');

  // Expose active state signals directly from service
  protected activeConversation = this.conversationService.activeConversation;
  protected activeMessages = this.conversationService.activeMessages;
  protected unreadMap = this.conversationService.unreadMap;
  protected currentUser = signal<User | null>(null);

  @ViewChild('messagesContainer') private readonly messagesContainer!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.currentUser.set(this.userService.getCurrentUser());
    this.loadUserConversations();
  }

  ngOnDestroy(): void {
    this.conversationService.leaveConversation();
  }

  private loadUserConversations(): void {
    this.isLoadingConversations.set(true);
    this.conversationService.getUserConversations().subscribe({
      next: (res) => {
        if (res.data) {
          this.conversations.set(res.data);
          this.conversationService.setInitialUnreadCounts(res.data);
        }
        this.isLoadingConversations.set(false);
      },
      error: () => {
        this.isLoadingConversations.set(false);
      }
    });
  }

  protected currentPage = signal(0);
  protected isLastPage = signal(false);
  protected isLoadingMore = signal(false);

  protected selectConversation(conversation: ConversationResponse): void {
    if (this.activeConversation()?.id === conversation.id) return;

    if (this.activeConversation()) {
      this.conversationService.leaveConversation();
    }

    this.conversationService.clearUnread(conversation.id);
    this.conversationService.subscribeToConversation(conversation);

    this.currentPage.set(0);
    this.isLastPage.set(false);
    this.isLoadingMessages.set(true);

    // Fetch historical paginated messages
    this.conversationService.getConversationMessages(conversation.id, 0, 30).subscribe({
      next: (res) => {
        // PaginatedApiResponse structure
        if (res.data) {
          // Reverse or order correctly based on backend sorting (backend sent_at ASC)
          const rawMessages = res.data || [];

          // Reverse initial batch so oldest is at the top and newest is at the bottom
          const sortedMessages = [...rawMessages].reverse();
          this.conversationService.activeMessages.set(sortedMessages);

          this.isLastPage.set(res.last ?? res.data.length < 30);

          const currentUserId = this.currentUser()?.id;
          const unreadIds = res.data
            .filter(m => m.senderId !== currentUserId && m.deliveryStatus !== MessageDeliveryStatus.READ)
            .map(m => m.id);

          if (unreadIds.length > 0) {
            this.conversationService.sendDeliveryStatusUpdate(conversation.id, unreadIds, MessageDeliveryStatusUpdate.READ);
          }
        }
        setTimeout(() => this.scrollToBottom(), 50);
        this.isLoadingMessages.set(false);
      },
      error: () => {
        this.isLoadingMessages.set(false);
      }
    });
  }

  protected sendMessage(): void {
    const content = this.messageInput().trim();
    const activeConv = this.activeConversation();

    if (!content || !activeConv) return;

    // Send payload over WebSocket destination /app/chat.send
    this.conversationService.sendMessage({
      attachments: [],
      conversationId: activeConv.id,
      content: content
    });

    // Clear input field
    this.messageInput.set('');
    setTimeout(() => this.scrollToBottom(), 50);
  }

  sendFirstHi():void{
    const activeConv = this.activeConversation();
    if (!activeConv) return;

    this.conversationService.sendMessage({
      attachments: [],
      conversationId: activeConv.id,
      content: 'Hi there! 👋'
    });

    // Clear input field
    this.messageInput.set('');
  }

  onChatScroll(event: Event): void {
    const element = event.target as HTMLElement;

    // If user scrolled near the top (e.g., within 50px) and we aren't already loading and there are more pages
    if (element.scrollTop <= 50 && !this.isLoadingMore() && !this.isLastPage()) {
      this.loadOlderMessages(element);
    }
  }

  private loadOlderMessages(containerElement: HTMLElement): void {
    const activeConv = this.activeConversation();
    if (!activeConv) return;

    this.isLoadingMore.set(true);
    const nextPage = this.currentPage() + 1;

    // Scroll position before loading older messages
    const previousScrollTop = containerElement.scrollTop;
    const previousScrollHeight = containerElement.scrollHeight;


    this.conversationService.getConversationMessages(activeConv.id, nextPage, 30).subscribe({
      next: (res) => {
        const rawOlderMessages = res.data || [];

        if (rawOlderMessages.length > 0) {
          const sortedOlderMessages = [...rawOlderMessages].reverse();

          // Prepend older messages to the beginning of the array
          this.conversationService.activeMessages.update(currentMessages => [
            ...sortedOlderMessages,
            ...currentMessages
          ]);

          this.currentPage.set(nextPage);
          this.isLastPage.set(res.last || rawOlderMessages.length < 30);

          // Restore scroll position so user doesn't lose their place
          setTimeout(() => {
            const newScrollHeight = containerElement.scrollHeight;
            const scrollDifference = newScrollHeight - previousScrollHeight;
            containerElement.scrollTop = previousScrollTop + scrollDifference;
            this.isLoadingMore.set(false);
          }, 50);
        } else {
          this.isLastPage.set(true);
        }

        this.isLoadingMore.set(false);
      },
      error: () => {
        this.isLoadingMore.set(false);
      }
    });
  }

  private scrollToBottom(): void {
    const container = this.messagesContainer?.nativeElement;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth'
    });
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.conversationService.leaveConversation();
  }

  protected readonly MessageSquare = MessageSquare;
  protected readonly Send = Send;
  protected readonly ImageIcon = ImageIcon;
  protected readonly Paperclip = Paperclip;
  protected readonly CheckCheck = CheckCheck;
  protected readonly MoreVertical = MoreVertical;
  protected readonly Video = Video;
  protected readonly Phone = Phone;
  protected readonly Search = Search;
  protected readonly environment = environment;
  protected readonly ConversationType = ConversationType;
  protected readonly MessageDeliveryStatus = MessageDeliveryStatus;
  protected readonly Check = Check;
}
