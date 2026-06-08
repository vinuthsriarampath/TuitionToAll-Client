import {AnnouncementStatus} from '../../../../core/enums/AnnouncementStatus';
import {AnnouncementVisibility} from '../../../../core/enums/AnnouncementVisibility';

export class AnnouncementResponse {
  id!: number;
  title!: string;
  description!: string;
  visibility!: AnnouncementVisibility;
  status!: AnnouncementStatus;
  pinned!: boolean;
  publishedDate!: string;     // ISO string
  expireAt!: string;          // ISO string
  createdDate!: string;       // ISO string
  lastModifiedDate!: string;  // ISO string
  instituteId!: number;
  courseId?: number;
  batchId?: number;
}
