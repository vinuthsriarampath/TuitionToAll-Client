import {Routes} from '@angular/router';
import {studentRoleGuard} from '@core/guards/role-guards/student-role-guard/student-role.guard';
import {StudentShellComponent} from '@features/dashboards/pages/student-shell/student-shell.component';
import {StudentDashboardComponent} from '@features/student/pages/student-dashboard/student-dashboard.component';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    title: "Student dashboard",
    canActivateChild: [studentRoleGuard],
    component: StudentShellComponent,
    data:{
      breadcrumb: 'Student'
    },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      {
        path: 'dashboard',
        component: StudentDashboardComponent,
        data: {
          breadcrumb: "Dashboard"
        }
      }
    ]
  },
]
