import {Routes} from '@angular/router';
import {modulesResolver} from '@features/module/resolvers/modules.resolver';
import {ModuleResolverData} from '@features/module/resolvers/module-resolver-data';

export const INSTITUTE_MODULE_ROUTES:Routes = [
  {
    path: ':moduleId',
    resolve: {module: modulesResolver},
    data: {breadcrumb: (data:ModuleResolverData) => data.module.name},
    children:[
      {
        path: '',
        data:{breadcrumb: null},
        loadComponent: () => import('@features/module/pages/module-view/module-view.component').then(m => m.ModuleViewComponent)
      },
      {
        path:'assignments',
        data:{breadcrumb: 'Assignments'},
        loadChildren: () => import('@features/assignments/routes/institute-module-assignment.routes').then(m => m.INSTITUTE_MODULE_ASSIGNMENT_ROUTES)
      },
      {
        path:'chapters',
        data: {breadcrumb: null},
        loadChildren: () => import('@features/chapter/routes/institute-chapter.routes').then(m => m.INSTITUTE_CHAPTER_ROUTES)
      }
    ]
  },
];
