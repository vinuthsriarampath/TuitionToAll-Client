import {Routes} from '@angular/router';
import {teacherRoleGuard} from '@core/guards/role-guards/teacher-role-guard/teacher-role.guard';
import {TeacherShellComponent} from '@features/dashboards/pages/teacher-shell/teacher-shell.component';
import {TeacherDashboardComponent} from '@features/teacher/pages/teacher-dashboard/teacher-dashboard.component';

export const TEACHER_ROUTES: Routes = [
  {
    path: '',
    title: "Teacher dashboard",
    canActivateChild: [teacherRoleGuard],
    component: TeacherShellComponent,
    data:{
      breadcrumb: 'Teacher'
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        component: TeacherDashboardComponent,
        data: {
          breadcrumb: "Dashboard"
        }
      }
    ]
  },
];
