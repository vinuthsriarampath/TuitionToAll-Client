import {inject, Injectable, signal} from '@angular/core';
import {StompClientService} from '@core/services/stomp/stomp-client.service';
import {AlertService} from '@core/services/alerts/alert.service';
import {NotificationResponse} from '@features/notifications/dtos/responses/notification-response';

@Injectable({
  providedIn: 'root'
})
export class GlobalNotificationService {
  private readonly stompClient = inject(StompClientService);
  private readonly alertService = inject(AlertService);

  // Global reactive signal for badge count across the app shell
  readonly globalUnreadCount = signal<number>(0);

  /**
   * Initialize background listener for user notifications queue
   */
  initGlobalListener(): void {
    // Subscribes to user-specific destination /user/queue/notifications
    this.stompClient.subscribe('/user/queue/notifications', (message) => {
      const notification = JSON.parse(message.body) as NotificationResponse;

      // Increment badge counter
      this.globalUnreadCount.update(count => count + 1);

      // Trigger subtle toast alert
      this.alertService.triggerSuccessAlert(`New ${notification.type.toLowerCase()}: ${notification.title}`);
    });
  }

  setInitialUnreadCount(count: number): void {
    this.globalUnreadCount.set(count);
  }

  decrementUnreadCount(): void {
    this.globalUnreadCount.update(count => Math.max(0, count - 1));
  }

  resetUnreadCount(): void {
    this.globalUnreadCount.set(0);
  }
}
