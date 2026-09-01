import {
  AnnouncementsManagementComponent
} from '@features/announcement/pages/announcements-management/announcements-management.component';
import {ViewAnnouncementComponent} from '@features/announcement/pages/view-announcement/view-announcement.component';
import {announcementResolver} from '@features/announcement/resolvers/announcement.resolver';
import {AnnouncementResolverData} from '@features/announcement/resolvers/announcement-resolver-data';
import {Routes} from '@angular/router';

export const INSTITUTE_ANNOUNCEMENT_ROUTES:Routes = [
  {
    path: '',
    component: AnnouncementsManagementComponent,
    data: {breadcrumb: null},
  },
  {
    path: ':announcementId',
    component: ViewAnnouncementComponent,
    resolve: {
      announcement: announcementResolver
    },
    data:{
      breadcrumb: (data:AnnouncementResolverData)=> data.announcement.title
    }
  }
];
