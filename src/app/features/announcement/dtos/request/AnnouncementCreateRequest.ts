import {AnnouncementVisibility} from '../../../../core/enums/AnnouncementVisibility';
import {AnnouncementCreateStatus} from './enums/AnnouncementCreateStatus';

export class AnnouncementCreateRequest {
  title!: string;
  description!: string;
  visibility!: AnnouncementVisibility;
  status!: AnnouncementCreateStatus;
  expireAt!: string;
  courseId?: number;
  batchId?: number;
}
