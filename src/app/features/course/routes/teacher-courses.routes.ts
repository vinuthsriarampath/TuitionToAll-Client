import {Routes} from '@angular/router';
import {teacherCourseResolver} from '@features/course/resolvers/teacher-course-resolver/teacher-course.resolver';
import {
  TeacherCourseResolverData
} from '@features/course/resolvers/teacher-course-resolver/teacher-course-resolver-data';
import {modulesResolver} from '@features/module/resolvers/modules.resolver';
import {ModuleResolverData} from '@features/module/resolvers/module-resolver-data';

export const TEACHER_COURSES_ROUTES: Routes = [
  {
    path: '',
    title: "My Teachings",
    data:{breadcrumb: null},
    loadComponent: () => import('@features/teacher/pages/teacher-courses/teacher-courses.component').then(m => m.TeacherCoursesComponent),
  },
  {
    path: 'courses/:courseId',
    resolve: {course: teacherCourseResolver},
    data: {
      breadcrumb: (data:TeacherCourseResolverData) => data.course.course.title
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        title: route => route.parent?.data['course'].title,
        loadComponent: () => import('@features/course/pages/teacher-course-view/teacher-course-view.component').then(m => m.TeacherCourseViewComponent),
      },
      {
        path: 'announcements',
        data: {
          breadcrumb: 'Announcements'
        },
        title: 'Announcements',
        loadChildren: () => import('@features/announcement/routes/teacher-announcement.routes').then(m => m.TEACHER_ANNOUNCEMENT_ROUTES)
      },
      {
        path: 'batches/:batchId/modules/:moduleId',
        resolve: {module: modulesResolver},
        data: {
          breadcrumb: (data:ModuleResolverData) => data.module.name
        },
        loadChildren: ()=> import('@features/module/routes/teacher-module-routes').then(m => m.TEACHER_MODULE_ROUTES)
      }
    ]
  }
]
