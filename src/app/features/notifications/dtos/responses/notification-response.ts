import {NotificationType} from '@features/notifications/enums/notification-type';

export class NotificationResponse {
  id!: number;
  userId!: number;
  title!: string;
  content!: string;
  type!: NotificationType;
  entityType?: string;
  entityId?: number;
  targetRoute?: string;
  isRead!: boolean;
  readAt!: string | null;
  createdAt!: string;
}
