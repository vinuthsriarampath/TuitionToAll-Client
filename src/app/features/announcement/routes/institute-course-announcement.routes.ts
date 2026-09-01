import {Routes} from '@angular/router';
import {announcementResolver} from '@features/announcement/resolvers/announcement.resolver';
import {AnnouncementResolverData} from '@features/announcement/resolvers/announcement-resolver-data';

export const INSTITUTE_COURSE_ANNOUNCEMENT_ROUTES: Routes = [
  {
    path:'',
    data: {breadcrumb: null},
    loadComponent: () => import('@features/announcement/pages/course-announcement-view/course-announcement-view.component').then(m => m.CourseAnnouncementViewComponent)
  },
  {
    path: ':announcementId',
    resolve: {announcement: announcementResolver},
    data:{breadcrumb: (data:AnnouncementResolverData)=> data.announcement.title},
    loadComponent: () => import('@features/announcement/pages/view-announcement/view-announcement.component').then(m => m.ViewAnnouncementComponent)
  }
];
