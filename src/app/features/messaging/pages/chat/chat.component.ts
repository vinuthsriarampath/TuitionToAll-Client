import {
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { User } from '@features/user/dtos/responses/user';
import { ConversationService } from '@features/messaging/services/conversation/conversation.service';
import { UserService } from '@features/user/services/user/user.service';
import {
  Check,
  CheckCheck,
  ChevronDown,
  CircleX,
  Edit,
  LucideAngularModule,
  MessageSquare,
  Paperclip,
  Search,
  Send,
  Trash2,
} from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { environment } from '@env/environment.development';
import { ConversationType } from '@features/messaging/enums/conversation-type';
import { MessageDeliveryStatus } from '@features/messaging/enums/message-delivery-status';
import { ChatAttachmentService } from '@features/messaging/services/chat-attachment/chat-attachment.service';
import { AlertService } from '@core/services/alerts/alert.service';
import { CardShellComponent } from '@shared/ui';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { ChatMessageResponse } from '@features/messaging/dtos/responses/chat-message-response';
import { ConversationUnreadService } from '@features/messaging/services/conversation-unread/conversation-unread.service';
import { ConversationMessageService } from '@features/messaging/services/conversation-message/conversation-message.service';
import { MessageReceiptResponse } from '@features/messaging/dtos/responses/message-receipt-response';
import { ChatSidebarComponent } from '@features/messaging/components/chat-sidebar/chat-sidebar.component';

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
    ChatSidebarComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  private readonly conversationService = inject(ConversationService);
  private readonly userService = inject(UserService);
  private readonly chatAttachmentService = inject(ChatAttachmentService);
  private readonly alertService = inject(AlertService);
  private readonly conversationUnreadService = inject(ConversationUnreadService);
  private readonly conversationMessageService = inject(ConversationMessageService);

  protected currentPage = this.conversationMessageService.currentPage;
  protected isLastPage = this.conversationMessageService.isLastPage;
  protected isLoadingMoreMessages = this.conversationMessageService.isLoadingMoreMessages;
  protected isInitialMessagesLoading = this.conversationMessageService.isInitialMessagesLoading;

  protected messageInput = signal('');

  // Expose active state signals directly from service
  protected activeConversation = this.conversationService.activeConversation;
  protected activeMessages = this.conversationMessageService.activeMessages;

  protected currentUser = signal<User | null>(null);

  protected selectedFiles = signal<File[]>([]);
  protected isUploadingFiles = signal(false);

  private readonly lastReadMessageIds = new Map<number, number>();

  readonly isAtBottom = signal<boolean>(true);
  readonly isDocumentVisible = signal<boolean>(document.visibilityState === 'visible');

  @ViewChild('messagesContainer')
  private readonly messagesContainer!: ElementRef<HTMLDivElement>;

  constructor() {
    effect(() => {
      const messages = this.conversationMessageService.activeMessages();
      const conversation = this.activeConversation();

      const atBottom = this.isAtBottom();
      const documentVisible = this.isDocumentVisible();

      if ( !conversation || messages.length === 0 || this.isInitialMessagesLoading() || !atBottom || !documentVisible) {
        return;
      }

      const lastMessage = messages.at(-1);

      // Only mark as read if the latest message belongs to the active conversation.
      if (lastMessage && lastMessage.conversationId !== conversation.id) {
        return;
      }

      setTimeout(() => {
        if ( this.activeConversation()?.id !== conversation.id || !this.isAtBottom() || !this.isDocumentVisible() ) {
          return;
        }

        this.scrollToBottom();
        this.markActiveConversationAsRead();
      }, 50);
    });
  }

  ngOnInit(): void {
    this.currentUser.set(this.userService.getCurrentUser());
  }



  protected loadInitialMessages(conversationId: number): void {
    this.isInitialMessagesLoading.set(true);

    // Fetch historical paginated messages.
    this.conversationService.getConversationMessages(conversationId, 0, 30).subscribe({
        next: (res) => {
          if (res.data) {
            this.conversationMessageService.setInitialMessages(res.data);

            this.isLastPage.set(res.last ?? res.data.length < 30);
          }

          this.isInitialMessagesLoading.set(false);

          // Wait for messages to render before marking them as read.
          setTimeout(() => {
            // Prevent marking a conversation that the user has already left.
            if (this.activeConversation()?.id !== conversationId) return;

            this.scrollToBottom();

            const messages = this.conversationMessageService.activeMessages();
            const lastMessage = messages.at(-1);

            if (lastMessage) {
              this.markActiveConversationAsRead();
            }
          }, 50);
        },
        error: () => {
          this.isInitialMessagesLoading.set(false);
          this.alertService.triggerErrorAlert('Failed to load conversation messages.');
        },
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
          this.conversationMessageService.sendMessage({
            conversationId: activeConv.id,
            content: content,
            attachments: uploadedAttachments
              ? uploadedAttachments.map((att) => ({
                  fileUrl: att.fileUrl,
                  fileName: att.fileName,
                  fileType: att.fileType,
                  fileSize: att.fileSize,
                }))
              : [],
          });
          this.messageInput.set('');
        },
        error: (err) => {
          this.isUploadingFiles.set(false);
          this.alertService.triggerErrorAlert(
            err.error.message || 'Failed to upload files.',
          );
        },
      });
    } else {
      // Send payload over WebSocket destination /app/chat.send
      this.conversationMessageService.sendMessage({
        attachments: [],
        conversationId: activeConv.id,
        content: content,
      });

      // Clear input field
      this.messageInput.set('');
    }

    setTimeout(() => this.scrollToBottom(), 50);
  }

  sendFirstHi(): void {
    const activeConv = this.activeConversation();
    if (!activeConv) return;

    this.conversationMessageService.sendMessage({
      attachments: [],
      conversationId: activeConv.id,
      content: 'Hi there! 👋',
    });

    // Clear input field
    this.messageInput.set('');
  }

  protected deleteMessage(messageId: number): void {
    const activeConv = this.activeConversation();
    if (!activeConv) return;

    this.conversationMessageService.deleteMessage({
      conversationId: activeConv.id,
      messageId: messageId,
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

    this.conversationMessageService.editMessage({
      conversationId: activeConv.id,
      messageId: messageId,
      newContent: content,
    });

    this.cancelEditing();
  }

  protected onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const filesArray = Array.from(input.files);
      // Append or set selected files for preview
      this.selectedFiles.update((current) => [...current, ...filesArray]);
    }
    // Reset input so same file can be re-selected if needed
    input.value = '';
  }

  protected removeStagedFile(index: number): void {
    this.selectedFiles.update((files) => files.filter((_, i) => i !== index));
  }

  onChatScroll(event: Event): void {
    const element = event.target as HTMLElement;

    const distanceFromBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight;

    this.isAtBottom.set(distanceFromBottom <= 80);

    // Load older messages when scrolling near the top.
    if ( element.scrollTop <= 50 && !this.isLoadingMoreMessages() && !this.isLastPage() ) {
      this.loadOlderMessages(element);
    }
  }

  private loadOlderMessages(containerElement: HTMLElement): void {
    const activeConv = this.activeConversation();
    if (!activeConv) return;

    this.isLoadingMoreMessages.set(true);
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
            this.conversationMessageService.activeMessages.update(
              (currentMessages) => [...sortedOlderMessages, ...currentMessages],
            );

            this.currentPage.set(nextPage);
            this.isLastPage.set(res.last || rawOlderMessages.length < 30);

            // Restore scroll position so user doesn't lose their place
            setTimeout(() => {
              const newScrollHeight = containerElement.scrollHeight;
              const scrollDifference = newScrollHeight - previousScrollHeight;
              containerElement.scrollTop = previousScrollTop + scrollDifference;
              this.isLoadingMoreMessages.set(false);
            }, 50);
          } else {
            this.isLastPage.set(true);
          }

          this.isLoadingMoreMessages.set(false);
        },
        error: () => {
          this.isLoadingMoreMessages.set(false);
        },
      });
  }

  private scrollToBottom(): void {
    const container = this.messagesContainer?.nativeElement;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }

  protected getMessageDeliveryStatus( message: ChatMessageResponse, ): MessageDeliveryStatus | null {
    const receipts = message.receipts ?? [];

    if (message.senderId !== this.currentUser()?.id) {
      return null;
    }

    const conversation = this.activeConversation();

    if (!conversation || receipts.length === 0) {
      return null;
    }

    // Direct conversation: exactly one recipient
    if (conversation.type === ConversationType.DIRECT) {
      if (receipts.length !== 1) {
        return null;
      }

      return receipts[0].status;
    }

    // Group conversation: at least two recipients
    if (conversation.type === ConversationType.GROUP) {
      if (receipts.length < 2) {
        return null;
      }

      const everyoneRead = receipts.every(
        (receipt) => receipt.status === MessageDeliveryStatus.READ,
      );

      if (everyoneRead) {
        return MessageDeliveryStatus.READ;
      }

      const everyoneDelivered = receipts.every(
        (receipt) =>
          receipt.status === MessageDeliveryStatus.DELIVERED ||
          receipt.status === MessageDeliveryStatus.READ,
      );

      if (everyoneDelivered) {
        return MessageDeliveryStatus.DELIVERED;
      }

      return MessageDeliveryStatus.SENT;
    }

    return null;
  }

  protected getReceiptTimestamp(receipt: MessageReceiptResponse): string {
    switch (receipt.status) {
      case MessageDeliveryStatus.DELIVERED:
        return receipt.deliveredAt
          ? new Date(receipt.deliveredAt).toLocaleString()
          : 'Delivery time unavailable';

      case MessageDeliveryStatus.READ:
        return receipt.readAt
          ? new Date(receipt.readAt).toLocaleString()
          : 'Read time unavailable';

      default:
        return 'Waiting for delivery';
    }
  }

  protected markActiveConversationAsRead(): void {
    const conversation = this.activeConversation();

    if (!conversation || this.isInitialMessagesLoading() || !this.isAtBottom() || !this.isDocumentVisible()) {
      return;
    }

    const messages = this.conversationMessageService.activeMessages();

    if (messages.length === 0) {
      return;
    }

    const lastMessage = messages.at(-1);

    if (!lastMessage) return;

    const lastReadMessageId = this.lastReadMessageIds.get(conversation.id) ?? 0;

    // Avoid duplicate requests or moving the cursor backwards.
    if (lastMessage.id <= lastReadMessageId) {
      return;
    }

    this.lastReadMessageIds.set(conversation.id, lastMessage.id);

    this.conversationUnreadService.markAsRead(conversation.id, lastMessage.id).subscribe({
      error: (error) => {
        this.alertService.triggerErrorAlert(error.error?.message || 'Failed to mark conversation as read.');
      }
    });
  }

  @HostListener('document:visibilitychange')
  protected onDocumentVisibilityChange(): void {
    this.isDocumentVisible.set(document.visibilityState === 'visible');

    if (this.isDocumentVisible() && this.isAtBottom()) {
      this.markActiveConversationAsRead();
    }
  }


  protected readonly MessageSquare = MessageSquare;
  protected readonly Send = Send;
  protected readonly Paperclip = Paperclip;
  protected readonly CheckCheck = CheckCheck;
  protected readonly Search = Search;
  protected readonly environment = environment;
  protected readonly ConversationType = ConversationType;
  protected readonly MessageDeliveryStatus = MessageDeliveryStatus;
  protected readonly Check = Check;
  protected readonly ChevronDown = ChevronDown;
  protected readonly Trash2 = Trash2;
  protected readonly CircleX = CircleX;
  protected readonly Edit = Edit;
  protected readonly Event = Event;
}
