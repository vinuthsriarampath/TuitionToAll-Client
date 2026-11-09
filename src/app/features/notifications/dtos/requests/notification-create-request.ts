import {NotificationType} from '@features/notifications/enums/notification-type';

export class NotificationCreateRequest {
  userId!: number;
  title!: string;
  content!: string;
  type!: NotificationType;
  entityType?: string;
  entityId?: number;
  targetRoute?: string;
}
