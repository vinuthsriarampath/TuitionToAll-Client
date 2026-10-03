import {Routes} from '@angular/router';
import {chapterResolver} from '@features/chapter/resolvers/chapter.resolver';
import {ChapterResolverData} from '@features/chapter/resolvers/chapter-resolver-data';

export const TEACHER_MODULE_ROUTES: Routes = [
  {
    path: '',
    title: route => route.parent?.data['module'].title,
    data: {
      breadcrumb: null,
      canEditModule: false,

      canAddChapter: true,
      canEditChapter: true,
      canReorderChapter: true,

      canAddAssignment: true,
      canEditAssignment: true,
      availableAssignmentsOnly: false
    },
    loadComponent: () => import('@features/module/pages/module-view/module-view.component').then(m => m.ModuleViewComponent),
  },
  {
    path:'assignments',
    data:{breadcrumb: null},
    loadChildren: () => import('@features/assignments/routes/teacher-assignment.routes').then(m => m.TEACHER_ASSIGNMENT_ROUTES)
  },
  {
    path: 'chapters/:chapterId',
    resolve: {chapter: chapterResolver},
    data: {
      breadcrumb: (data: ChapterResolverData) => data.chapter.title
    },
    loadChildren: () => import('@features/chapter/routes/teacher-chapter.routes').then(m => m.TEACHER_CHAPTER_ROUTES)
  }
]
