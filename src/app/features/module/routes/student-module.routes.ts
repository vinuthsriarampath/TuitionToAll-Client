import {Routes} from '@angular/router';
import {chapterResolver} from '@features/chapter/resolvers/chapter.resolver';
import {ChapterResolverData} from '@features/chapter/resolvers/chapter-resolver-data';

export const STUDENT_MODULE_ROUTES: Routes = [
  {
    path: '',
    title: route => route.parent?.data['module'].name,
    data: {
      breadcrumb: null,
      canEditModule: false,
      canAddChapter: false,
      canAddAssignment: false,
    },
    loadComponent: () => import('@features/module/pages/module-view/module-view.component').then(m => m.ModuleViewComponent),
  },
  {
    path: 'chapters/:chapterId',
    resolve: chapterResolver,
    data:{
      breadcrumb: (data:ChapterResolverData) => data.chapter.title
    },
    loadChildren: () => import('@features/chapter/routes/student-chapter.routes').then(m => m.STUDENT_CHAPTER_ROUTES)
  }
]
