import {Routes} from '@angular/router';

export const STUDENT_COURSE_ROUTES: Routes = [
  {
    path: '',
    title: 'My Learnings',
    data: { breadcrumb: 'My Learnings' },
    loadComponent: () => import('@features/student/pages/student-learnings/student-learnings.component').then(m => m.StudentLearningsComponent)
  }
];
