import {AnnouncementVisibility} from '../../../enums/AnnouncementVisibility';

export class AnnouncementVisibilityUpdateRequest {
  visibility!: AnnouncementVisibility;
  courseId?: number;
  batchId?: number;
}
