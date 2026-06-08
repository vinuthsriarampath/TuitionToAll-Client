import {AnnouncementVisibility} from '../../../../core/enums/AnnouncementVisibility';

export class AnnouncementVisibilityUpdateRequest {
  visibility!: AnnouncementVisibility;
  courseId?: number;
  batchId?: number;
}
