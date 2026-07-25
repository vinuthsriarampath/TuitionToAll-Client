import { ResolveFn } from '@angular/router';
import {AnnouncementResponse} from '@features/announcement/dtos/response/AnnouncementResponse';
import {inject} from '@angular/core';
import {AnnouncementService} from '@features/announcement/services/announcements/announcement.service';
import {map} from 'rxjs/operators';

export const announcementResolver: ResolveFn<AnnouncementResponse> = (route, state) => {
  const announcementService = inject(AnnouncementService);

  return announcementService.getAnnouncementById(Number(route.paramMap.get('announcementId'))).pipe(
    map((res) => res.data as AnnouncementResponse)
  );
};
