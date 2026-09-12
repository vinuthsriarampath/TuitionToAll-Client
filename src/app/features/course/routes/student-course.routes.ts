import {Routes} from '@angular/router';
import {studentCourseResolver} from '@features/course/resolvers/student-course-resolver/student-course.resolver';
import {StudentCourseViewResponse} from '@features/course/dtos/response/student-course-view-response';
import {StudentCourseResolverData} from '@features/course/resolvers/student-course-resolver/StudentCourseResolverData';

export const STUDENT_COURSE_ROUTES: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null
    },
    title: 'My Learnings',
    loadComponent: () => import('@features/student/pages/student-learnings/student-learnings.component').then(m => m.StudentLearningsComponent)
  },
  {
    path: 'courses/:courseId/batches/:batchId',
    resolve: {course: studentCourseResolver},
    data: {
      breadcrumb: (data: StudentCourseResolverData) => data.course.course.title+' - '+data.course.selectedBatch.name
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        title: (route) => route.parent?.data['course'].course.title +' - '+route.parent?.data['course'].selectedBatch.name,
        loadComponent: () => import('@features/course/pages/student-course-view/student-course-view.component').then(m => m.StudentCourseViewComponent)
      },
      {
        path: 'announcements',
        data: {
          breadcrumb: 'Announcements'
        },
        title: 'Announcements',
        loadChildren: () => import('@features/announcement/routes/student-course-announcement.route').then(m => m.STUDENT_COURSE_ROUTES)
      }
    ]
  }
];
