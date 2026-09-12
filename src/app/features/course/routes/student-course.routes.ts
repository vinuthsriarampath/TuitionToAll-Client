import {Routes} from '@angular/router';
import {studentCourseResolver} from '@features/course/resolvers/student-course-resolver/student-course.resolver';
import {StudentCourseResolverData} from '@features/course/resolvers/student-course-resolver/StudentCourseResolverData';
import {modulesResolver} from '@features/module/resolvers/modules.resolver';
import {ModuleResolverData} from '@features/module/resolvers/module-resolver-data';

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
      },
      {
        path:'modules/:moduleId',
        resolve: {module: modulesResolver},
        data: {
          breadcrumb: (data:ModuleResolverData) => data.module.name
        },
        loadChildren: () => import('@features/module/routes/student-module.routes').then(m => m.STUDENT_MODULE_ROUTES)
      }
    ]
  }
];
