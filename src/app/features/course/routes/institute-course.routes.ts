import {Routes} from '@angular/router';
import {courseResolver} from '@features/course/resolvers/course.resolver';
import {CourseResolverData} from '@features/course/resolvers/course-resolver-data';

export const INSTITUTE_COURSE_ROUTES:Routes = [
  {
    path: '',
    title: 'Institute Courses',
    data : {breadcrumb: null},
    loadComponent: () => import('@features/institute/pages/institute-course-management/institute-course-management.component').then(m => m.InstituteCourseManagementComponent)
  },
  {
    path: 'create',
    title: 'Course Create',
    data:{breadcrumb:'Create'},
    loadComponent: () => import('@features/course/pages/course-create/course-create.component').then(m => m.CourseCreateComponent)
  },
  {
    path: ':courseId',
    resolve: {course: courseResolver},
    data: {breadcrumb: (data:CourseResolverData)=>data.course.title},
    children:[
      {
        path: '',
        title: (route) => route.parent?.data['course'].title,
        data: {breadcrumb: null},
        loadComponent: () => import('@features/course/pages/course-view/course-view.component').then(m => m.CourseViewComponent)
      },
      {
        path: 'update',
        title: (route) => route.parent?.data['course'].title + ' Update',
        data: {breadcrumb: 'Update'},
        loadComponent: () => import('@features/course/pages/course-update/course-update.component').then(m => m.CourseUpdateComponent)
      },
      {
        path: 'announcements',
        data: {breadcrumb: 'Announcements'},
        loadChildren: () => import('@features/announcement/routes/institute-course-announcement.routes').then(m => m.INSTITUTE_COURSE_ANNOUNCEMENT_ROUTES)
      },
      {
        path : 'feedbacks&reviews',
        data: {breadcrumb: 'Feedbacks & Reviews'},
        loadChildren: () => import('@features/course/routes/institute-course-reviews-and-feedback.routes').then(m => m.INSTITUTE_COURSE_REVIEWS_AND_FEEDBACK_ROUTES)
      },
      {
        path: 'batch-mgt',
        data:{breadcrumb: 'Batches'},
        loadChildren: () => import('@features/batch/routes/institute-batch.routes').then(m => m.INSTITUTE_BATCH_ROUTES)
      }
    ]
  }
]
