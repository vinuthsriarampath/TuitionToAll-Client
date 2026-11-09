import {Component, ElementRef, HostListener, inject, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {ConversationResponse} from '@features/messaging/dtos/responses/conversation-response';
import {User} from '@features/user/dtos/responses/user';
import {ConversationService} from '@features/messaging/services/conversation/conversation.service';
import {UserService} from '@features/user/services/user/user.service';
import {
  ArrowDown,
  Check,
  CheckCheck, ChevronDown, CircleX, Edit,
  ImageIcon,
  LucideAngularModule,
  MessageSquare,
  MoreVertical,
  Paperclip, Phone, Search,
  Send, Trash2,
  Video
} from 'lucide-angular';
import {FormsModule} from '@angular/forms';
import {environment} from '@env/environment.development';
import {ConversationType} from '@features/messaging/enums/conversation-type';
import {MessageDeliveryStatus} from '@features/messaging/enums/message-delivery-status';
import {MessageDeliveryStatusUpdate} from '@features/messaging/enums/message-delivery-status-update';
import {ChatAttachmentService} from '@features/messaging/services/chat-attachment/chat-attachment.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {CardShellComponent} from '@shared/ui';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {ChatMessageResponse} from '@features/messaging/dtos/responses/chat-message-response';
import {debounceTime, distinctUntilChanged, Subject, switchMap} from 'rxjs';

@Component({
  selector: 'app-chat',
  imports: [
    LucideAngularModule,
    FormsModule,
    CardShellComponent,
    NgOptimizedImage,
    DatePipe,
    MatMenuTrigger,
    MatMenu,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy{

  private readonly conversationService = inject(ConversationService);
  private readonly userService = inject(UserService);
  private readonly chatAttachmentService = inject(ChatAttachmentService);
  private readonly alertService = inject(AlertService);

  protected conversations = signal<ConversationResponse[]>([]);
  protected isLoadingConversations = signal(false);
  protected isLoadingMessages = signal(false);
  protected messageInput = signal('');

  // Expose active state signals directly from service
  protected activeConversation = this.conversationService.activeConversation;
  protected activeMessages = this.conversationService.activeMessages;
  protected unreadMap = this.conversationService.unreadMap;
  protected currentUser = signal<User | null>(null);

  protected selectedFiles = signal<File[]>([]);
  protected isUploadingFiles = signal(false);

  protected searchInput = signal('');
  private readonly searchSubject = new Subject<string>();

  @ViewChild('messagesContainer') private readonly messagesContainer!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.currentUser.set(this.userService.getCurrentUser());
    this.loadUserConversations();
    this.setupSearchSubscription();
  }

  ngOnDestroy(): void {
    this.conversationService.leaveConversation();
  }

  private setupSearchSubscription(): void {
    this.searchSubject.pipe(
      debounceTime(300), // Wait 300ms after the user stops typing
      distinctUntilChanged(), // Only trigger if the search term actually changed
      switchMap(searchTerm => {
        this.isLoadingConversations.set(true);
        return this.conversationService.getUserConversations({ searchTerm: searchTerm.trim() });
      })
    ).subscribe({
      next: (res) => {
        if (res.data) {
          this.conversations.set(res.data);
          this.conversationService.setInitialUnreadCounts(res.data);
        }
        this.isLoadingConversations.set(false);
      },
      error: (err) => {
        this.isLoadingConversations.set(false);
        this.alertService.triggerErrorAlert(err.error?.message || 'Failed to search conversations.');
      }
    });
  }

  protected onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchInput.set(value);
    this.searchSubject.next(value); // Push value into RxJS pipeline
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
    const files = this.selectedFiles();

    if ((!content && files.length === 0) || !activeConv) return;

    if (files.length > 0) {
      this.chatAttachmentService.uploadAttachment(files).subscribe({
        next: (res) => {
          const uploadedAttachments = res.data;
          this.isUploadingFiles.set(false);
          this.selectedFiles.set([]); // Clear staged files

          // 2. Dispatch STOMP message with attachment metadata
          this.conversationService.sendMessage({
            conversationId: activeConv.id,
            content: content,
            attachments: uploadedAttachments ? uploadedAttachments.map(att => ({
              fileUrl: att.fileUrl,
              fileName: att.fileName,
              fileType: att.fileType,
              fileSize: att.fileSize
            })) : []
          });
          this.messageInput.set('');
        },
        error: (err) => {
          this.isUploadingFiles.set(false);
          this.alertService.triggerErrorAlert(err.error.message || 'Failed to upload files.');
        }
      })
    }else{
      // Send payload over WebSocket destination /app/chat.send
      this.conversationService.sendMessage({
        attachments: [],
        conversationId: activeConv.id,
        content: content
      });

      // Clear input field
      this.messageInput.set('');
    }

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

  protected deleteMessage(messageId: number): void {
    const activeConv = this.activeConversation();
    if (!activeConv) return;

    this.conversationService.deleteMessage({
      conversationId: activeConv.id,
      messageId: messageId
    });
  }

  protected editingMessageId = signal<number | null>(null);
  protected editContentInput = signal<string>('');

  protected startEditing(msg: ChatMessageResponse): void {
    this.editingMessageId.set(msg.id);
    this.editContentInput.set(msg.content);
  }

  protected cancelEditing(): void {
    this.editingMessageId.set(null);
    this.editContentInput.set('');
  }

  protected submitEdit(messageId: number): void {
    const activeConv = this.activeConversation();
    const content = this.editContentInput().trim();
    if (!activeConv || !content) return;

    this.conversationService.editMessage({
      conversationId: activeConv.id,
      messageId: messageId,
      newContent: content
    });

    this.cancelEditing();
  }

  protected onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const filesArray = Array.from(input.files);
      // Append or set selected files for preview
      this.selectedFiles.update(current => [...current, ...filesArray]);
    }
    // Reset input so same file can be re-selected if needed
    input.value = '';
  }

  protected removeStagedFile(index: number): void {
    this.selectedFiles.update(files => files.filter((_, i) => i !== index));
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
  protected readonly ArrowDown = ArrowDown;
  protected readonly ChevronDown = ChevronDown;
  protected readonly Trash2 = Trash2;
  protected readonly CircleX = CircleX;
  protected readonly Edit = Edit;
}
