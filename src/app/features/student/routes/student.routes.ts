import {Routes} from '@angular/router';
import {studentRoleGuard} from '@core/guards/role-guards/student-role-guard/student-role.guard';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    title: "Student",
    canActivateChild: [studentRoleGuard],
    data:{breadcrumb: 'Student'},
    loadComponent: () => import('@features/dashboards/pages/student-shell/student-shell.component').then(m => m.StudentShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      {
        path: 'dashboard',
        title: 'Student Dashboard',
        data: {breadcrumb: "Dashboard"},
        loadComponent: () => import('@features/student/pages/student-dashboard/student-dashboard.component').then(m => m.StudentDashboardComponent),
      },
      {
        path: 'my-learnings',
        loadChildren: () => import('@features/course/routes/student-course.routes').then(m => m.STUDENT_COURSE_ROUTES),
      }
    ]
  },
]
