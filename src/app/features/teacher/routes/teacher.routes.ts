import {Routes} from '@angular/router';
import {teacherRoleGuard} from '@core/guards/role-guards/teacher-role-guard/teacher-role.guard';

export const TEACHER_ROUTES: Routes = [
  {
    path: '',
    title: "Teacher",
    canActivateChild: [teacherRoleGuard],
    loadComponent: () => import('@features/dashboards/pages/teacher-shell/teacher-shell.component').then(m => m.TeacherShellComponent),
    data:{breadcrumb: 'Teacher'},
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        title: 'Teacher Dashboard',
        data: {breadcrumb: "Dashboard"},
        loadComponent: () => import('@features/teacher/pages/teacher-dashboard/teacher-dashboard.component').then(m => m.TeacherDashboardComponent),
      },
      {
        path: 'my-teachings',
        data: { breadcrumb: 'My Teachings' },
        loadChildren: () => import('@features/course/routes/teacher-courses.routes').then(m => m.TEACHER_COURSES_ROUTES)
      },
      {
        path:'my-applications',
        data:{
          breadcrumb: 'My Applications'
        },
        loadComponent: () => import('@features/teacher/pages/my-applications/my-applications.component').then(m => m.MyApplicationsComponent)
      }
    ]
  },
];
