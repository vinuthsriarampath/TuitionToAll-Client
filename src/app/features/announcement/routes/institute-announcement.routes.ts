import {announcementResolver} from '@features/announcement/resolvers/announcement.resolver';
import {AnnouncementResolverData} from '@features/announcement/resolvers/announcement-resolver-data';
import {Routes} from '@angular/router';

export const INSTITUTE_ANNOUNCEMENT_ROUTES:Routes = [
  {
    path: '',
    title: 'Institute Announcements',
    data: {breadcrumb: null},
    loadComponent: () => import('@features/announcement/pages/announcements-management/announcements-management.component').then(m => m.AnnouncementsManagementComponent)
  },
  {
    path: ':announcementId',
    data:{breadcrumb: (data:AnnouncementResolverData)=> data.announcement.title},
    resolve: {announcement: announcementResolver},
    loadComponent: () => import('@features/announcement/pages/view-announcement/view-announcement.component').then(m => m.ViewAnnouncementComponent),
  }
];
