import {Component, inject, OnInit, signal} from '@angular/core';
import {PageLayoutComponent} from '@core/layouts';
import {NotificationService} from '@features/notifications/services/notification/notification.service';
import {Bell, BookOpen, CheckCheck, FileText, LucideAngularModule, Megaphone, MessageSquare} from 'lucide-angular';
import {NotificationResponse} from '@features/notifications/dtos/responses/notification-response';
import {Router} from '@angular/router';
import {AlertService} from '@core/services/alerts/alert.service';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {UserService} from '@features/user/services/user/user.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [
    PageLayoutComponent,
    LucideAngularModule,
    DatePipe
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{
  private readonly notificationService = inject(NotificationService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly alertService = inject(AlertService);

  protected notifications = signal<NotificationResponse[]>([]);
  protected unreadCount = signal<number>(0);
  protected loading = signal<boolean>(false);
  protected pagination = new PaginationRequest(0, 15, 'desc', ['created_at']);
  protected totalPages = signal<number>(0);
  protected isLast = signal<boolean>(false);

  private userId!: number;

  ngOnInit(): void {
    // Fetch currently logged-in user's ID from your auth service
    const currentUser = this.userService.getCurrentUser();
    if (currentUser?.id) {
      this.userId = currentUser.id;
      this.loadNotifications();
      this.loadUnreadCount();
    } else {
      this.alertService.triggerErrorAlert('User session not found.');
    }
  }

  protected loadNotifications(): void {
    this.loading.set(true);
    this.notificationService.getUserNotifications(this.userId, this.pagination).subscribe({
      next: (res) => {
        if (res.data) {
          this.notifications.set(res.data);
          this.totalPages.set(res.totalPages ?? 0);
          this.isLast.set(res.last ?? true);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error?.message || 'Failed to load notifications.');
        this.loading.set(false);
      }
    });
  }

  protected loadUnreadCount(): void {
    this.notificationService.getUnreadCount(this.userId).subscribe({
      next: (res) => {
        if (res.data !== undefined) {
          this.unreadCount.set(res.data);
        }
      }
    });
  }

  protected onMarkAllRead(): void {
    this.notificationService.markAllAsRead(this.userId).subscribe({
      next: () => {
        this.alertService.triggerSuccessAlert('All notifications marked as read.');
        // Update local state cleanly
        this.notifications.update(list => list.map(n => ({ ...n, isRead: true })));
        this.unreadCount.set(0);
      },
      error: (err) => {
        this.alertService.triggerErrorAlert(err.error?.message || 'Failed to update notifications.');
      }
    });
  }

  protected onNotificationClick(notification: NotificationResponse): void {
    // 1. Implicitly mark as read if unread
    if (!notification.isRead) {
      this.notificationService.markAsRead(notification.id, this.userId).subscribe({
        next: () => {
          this.notifications.update(list =>
            list.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
          );
          this.unreadCount.update(count => Math.max(0, count - 1));
        }
      });
    }

    // 2. Navigate to target route if available with 404 safety guard
    if (notification.targetRoute) {
      this.router.navigateByUrl(notification.targetRoute).catch(() => {
        this.alertService.triggerErrorAlert('Target page is no longer available or was removed.');
        this.router.navigate(['/app/dashboard']);
      });
    }
  }

  // Icon mapping helper based on notification type
  protected getNotificationIcon(type: string) {
    switch (type) {
      case 'CHAT': return MessageSquare;
      case 'ANNOUNCEMENT': return Megaphone;
      case 'ASSIGNMENT': return FileText;
      case 'LECTURE': return BookOpen;
      case 'RESOURCE': return BookOpen;
      default: return Bell;
    }
  }

  protected readonly Bell = Bell;
  protected readonly CheckCheck = CheckCheck;
}
