import {Routes} from '@angular/router';
import {instituteRoleGuard} from '@core/guards/role-guards/institute-role-guard/institute-role.guard';

export const INSTITUTE_ROUTES:Routes = [
  {
    path: '',
    title: "Institute",
    canActivateChild: [instituteRoleGuard],
    data: {breadcrumb: 'Institute'},
    loadComponent:() => import('@features/dashboards/pages/institute-shell/institute-shell.component').then(m => m.InstituteShellComponent),
    children:[
      { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      {
        path: 'dashboard',
        title: "Institute Dashboard",
        data : {breadcrumb: 'Dashboard'},
        loadComponent: () => import('@features/institute/pages/institute-dashboard/institute-dashboard.component').then(m => m.InstituteDashboardComponent),
      },
      {
        path: 'course-mgt',
        data:{breadcrumb:'Courses'},
        loadChildren: () => import('@features/course/routes/institute-course.routes').then(m => m.INSTITUTE_COURSE_ROUTES)
      },
      {
        path: "teacher-mgt",
        data: {breadcrumb: 'Teachers'},
        loadChildren: () => import('@features/institute/routes/institute-teacher.routes').then(m => m.INSTITUTE_TEACHER_ROUTES)
      },
      {
        path: "announcements-mgt",
        data: {breadcrumb: 'Announcements'},
        loadChildren: () => import('@features/announcement/routes/institute-announcement.routes').then(m => m.INSTITUTE_ANNOUNCEMENT_ROUTES)
      }
    ]
  },
]
