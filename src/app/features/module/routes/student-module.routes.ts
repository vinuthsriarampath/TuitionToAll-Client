import {Routes} from '@angular/router';

export const STUDENT_MODULE_ROUTES: Routes = [
  {
    path: '',
    title: route => route.parent?.data['module'].name,
    data: {
      breadcrumb: null,
      canEditModule: false,
      canAddChapter: false,
      canAddModuleAssignment: false,
    },
    loadComponent: () => import('@features/module/pages/module-view/module-view.component').then(m => m.ModuleViewComponent),
  }
]
