import {Routes} from '@angular/router';

export const INSTITUTE_BATCH_ROUTES: Routes = [
  {
    path: '',
    data: {breadcrumb: null},
    title: (route) => route.parent?.data['batch'].name,
    loadComponent: () => import('@features/batch/pages/batch-view/batch-view.component').then(m => m.BatchViewComponent)
  },
  {
    path: 'modules',
    data: {breadcrumb: 'modules'},
    loadChildren: () => import('@features/module/routes/institute-module.routes').then(m => m.INSTITUTE_MODULE_ROUTES)
  }
];
