import {AnnouncementStatus} from '@features/announcement/enums/AnnouncementStatus';
import {AnnouncementVisibility} from '@features/announcement/enums/AnnouncementVisibility';

export class AnnouncementFilterRequest {
  visibility?: AnnouncementVisibility;
  status?: AnnouncementStatus;
  courseId?: number;
  batchId?: number;
}
