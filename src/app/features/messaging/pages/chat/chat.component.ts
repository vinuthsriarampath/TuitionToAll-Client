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

  constructor() {
    effect(() => {
      // Track changes to the messages signal
      this.activeMessages();

      // Wait until Angular updates the DOM
      setTimeout(() => {
        this.scrollToBottom();
      });
    });
  }

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

  protected selectConversation(conversation: ConversationResponse): void {
    if (this.activeConversation()?.id === conversation.id) return;

    if (this.activeConversation()) {
      this.conversationService.leaveConversation();
    }

    this.conversationService.clearUnread(conversation.id);
    // Subscribe to STOMP WebSocket topic for this room
    this.conversationService.subscribeToConversation(conversation);

    this.isLoadingMessages.set(true);

    // Fetch historical paginated messages
    this.conversationService.getConversationMessages(conversation.id, 0, 30).subscribe({
      next: (res) => {
        // PaginatedApiResponse structure
        if (res.data) {
          // Reverse or order correctly based on backend sorting (backend sent_at ASC)
          this.conversationService.activeMessages.set(res.data);

          const currentUserId = this.currentUser()?.details?.id;
          const unreadIds = res.data
            .filter(m => m.senderId !== currentUserId && m.deliveryStatus !== MessageDeliveryStatus.READ)
            .map(m => m.id);

          if (unreadIds.length > 0) {
            this.conversationService.sendDeliveryStatusUpdate(conversation.id, unreadIds, MessageDeliveryStatusUpdate.READ);
          }
        }
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
