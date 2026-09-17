import {Routes} from '@angular/router';
import {AssignmentResolverData} from '@features/assignments/resolvers/assignment-resolver-data';

export const STUDENT_ASSIGNMENT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'view'
  },
  {
    path: 'view',
    data: {
      breadcrumb: (data:AssignmentResolverData) => data.assignment.topic,
      canSubmitAssignment: true,
    },
    title: route => route.parent?.data['assignment'].topic,
    loadComponent: () => import('@features/assignments/pages/assignment-view/assignment-view.component').then(m => m.AssignmentViewComponent)
  }
]
