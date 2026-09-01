import {Routes} from '@angular/router';
import {batchResolver} from '@features/batch/resolvers/batch.resolver';
import {BatchResolverData} from '@features/batch/resolvers/batch-resolver-data';

export const INSTITUTE_BATCH_ROUTES: Routes = [
  {
    path: '',
    data:{breadcrumb: null},
    loadComponent: () => import('@features/batch/pages/batch-management/batch-management.component').then(m => m.BatchManagementComponent)
  },
  {
    path: ':batchId',
    resolve: {batch: batchResolver},
    data: {breadcrumb: (data:BatchResolverData)=>data.batch.name},
    children:[
      {
        path: '',
        data:{breadcrumb: null},
        loadComponent: () => import('@features/batch/pages/batch-view/batch-view.component').then(m => m.BatchViewComponent)
      },
      {
        path: 'modules',
        data:{breadcrumb: null},
        loadChildren: () => import('@features/module/routes/institute-module.routes').then(m => m.INSTITUTE_MODULE_ROUTES)
      }
    ]
  }
];
