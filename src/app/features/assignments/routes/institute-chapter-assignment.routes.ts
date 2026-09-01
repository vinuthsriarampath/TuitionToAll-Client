import {Routes} from '@angular/router';
import {assignmentResolver} from '@features/assignments/resolvers/assignment.resolver';
import {AssignmentResolverData} from '@features/assignments/resolvers/assignment-resolver-data';

export const INSTITUTE_CHAPTER_ASSIGNMENTS_ROUTES: Routes = [
  {
    path: 'create',
    data:{breadcrumb: 'Create'},
    loadComponent: () => import('@features/assignments/pages/assignment-create/assignment-create.component').then(m => m.AssignmentCreateComponent)
  },
  {
    path: ':assignmentId',
    resolve: {assignment: assignmentResolver},
    data:{breadcrumb: (data:AssignmentResolverData)=>data.assignment.topic},
    children:[
      {
        path: 'update',
        data:{breadcrumb: "Update"},
        loadComponent: () => import('@features/assignments/pages/assignment-update/assignment-update.component').then(m => m.AssignmentUpdateComponent)
      },
      {
        path:'view',
        data:{breadcrumb: "View"},
        loadComponent: () => import('@features/assignments/pages/assignment-view/assignment-view.component').then(m => m.AssignmentViewComponent)
      }
    ]
  },
]
