import { Component, inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";
import { NotificationResponse } from "@features/notifications/dtos/responses/notification-response";
import {Router} from '@angular/router';
import { NotificationType } from "@features/notifications/enums/notification-type";
import {BookmarkCheck, BookOpen, FileText, LucideAngularModule, Megaphone, MessageSquare} from 'lucide-angular';
import {NotificationService} from '@features/notifications/services/notification/notification.service';
import {GlobalNotificationService} from '@core/services/global-notification/global-notification.service';
import {UserService} from '@features/user/services/user/user.service';

@Component({
  selector: 'app-notification-snackbar',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './notification-snackbar.component.html',
  styleUrl: './notification-snackbar.component.css'
})
export class NotificationSnackbarComponent {
  private readonly snackBarRef = inject(MatSnackBarRef<NotificationSnackbarComponent>);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);
  private readonly globalNotificationService = inject(GlobalNotificationService);
  private readonly userService = inject(UserService);

  readonly notification = inject<NotificationResponse>(MAT_SNACK_BAR_DATA);

  get themeStyles(): string {
    switch (this.notification.type) {
      case NotificationType.CHAT:
        return 'bg-sky-950/95 border-sky-500/50 shadow-sky-950/50';
      case NotificationType.ANNOUNCEMENT:
        return 'bg-amber-950/95 border-amber-500/50 shadow-amber-950/50';
      case NotificationType.ASSIGNMENT:
        return 'bg-rose-950/95 border-rose-500/50 shadow-rose-950/50';
      case NotificationType.LECTURE:
      case NotificationType.RESOURCE:
        return 'bg-emerald-950/95 border-emerald-500/50 shadow-emerald-950/50';
      default:
        return 'bg-slate-950/95 border-slate-700/50 shadow-slate-950/50';
    }
  }

  get iconBgStyles(): string {
    switch (this.notification.type) {
      case NotificationType.CHAT: return 'bg-sky-900/60 border border-sky-700/40';
      case NotificationType.ANNOUNCEMENT: return 'bg-amber-900/60 border border-amber-700/40';
      case NotificationType.ASSIGNMENT: return 'bg-rose-900/60 border border-rose-700/40';
      case NotificationType.LECTURE:
      case NotificationType.RESOURCE: return 'bg-emerald-900/60 border border-emerald-700/40';
      default: return 'bg-slate-800/60 border border-slate-700/40';
    }
  }

  get iconColorStyles(): string {
    switch (this.notification.type) {
      case NotificationType.CHAT: return 'text-sky-400';
      case NotificationType.ANNOUNCEMENT: return 'text-amber-400';
      case NotificationType.ASSIGNMENT: return 'text-rose-400';
      case NotificationType.LECTURE:
      case NotificationType.RESOURCE: return 'text-emerald-400';
      default: return 'text-slate-300';
    }
  }

  getIcon() {
    switch (this.notification.type) {
      case NotificationType.CHAT: return MessageSquare;
      case NotificationType.ANNOUNCEMENT: return Megaphone;
      case NotificationType.ASSIGNMENT: return FileText;
      case NotificationType.LECTURE: return BookOpen;
      case NotificationType.RESOURCE: return BookmarkCheck;
      default: return MessageSquare;
    }
  }

  view(): void {
    this.snackBarRef.dismiss();

    const currentUser = this.userService.getCurrentUser();

    if (!this.notification.isRead) {
      this.notificationService.markAsRead(this.notification.id, currentUser.id).subscribe({
        next: () => {
          this.globalNotificationService.decrementUnreadCount();
        }
      });
    }

    if (this.notification.targetRoute) {
      this.router.navigateByUrl(this.notification.targetRoute)
        .catch(() => {
          this.router.navigate(['/app/not-found']);
        });
    }
  }
}
