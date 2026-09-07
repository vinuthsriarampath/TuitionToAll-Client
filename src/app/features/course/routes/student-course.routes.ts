import {Routes} from '@angular/router';
import {studentCourseResolver} from '@features/course/resolvers/student-course-resolver/student-course.resolver';

export const STUDENT_COURSE_ROUTES: Routes = [
  {
    path: '',
    title: 'My Learnings',
    data: { breadcrumb: 'My Learnings' },
    loadComponent: () => import('@features/student/pages/student-learnings/student-learnings.component').then(m => m.StudentLearningsComponent)
  },
  {
    path: 'courses/:courseId/batches/:batchId',
    title: 'Course',
    data: { breadcrumb: 'Course' },
    resolve: {
      course: studentCourseResolver
    },
    loadComponent: () => import('@features/course/pages/student-course-view/student-course-view.component').then(m => m.StudentCourseViewComponent)
  }
];
