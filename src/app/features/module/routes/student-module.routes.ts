import {Routes} from '@angular/router';
import {chapterResolver} from '@features/chapter/resolvers/chapter.resolver';
import {ChapterResolverData} from '@features/chapter/resolvers/chapter-resolver-data';
import {assignmentResolver} from '@features/assignments/resolvers/assignment.resolver';

export const STUDENT_MODULE_ROUTES: Routes = [
  {
    path: '',
    title: route => route.parent?.data['module'].name,
    data: {
      breadcrumb: null,
      canEditModule: false,

      canAddChapter: false,
      canEditChapter: false,
      canReorderChapter: false,

      canAddAssignment: false,
      canEditAssignment: false,
    },
    loadComponent: () => import('@features/module/pages/module-view/module-view.component').then(m => m.ModuleViewComponent),
  },
  {
    path: 'assignments/:assignmentId',
    resolve: {assignment: assignmentResolver},
    loadChildren: () => import('@features/assignments/routes/student-assignment.routes').then(m => m.STUDENT_ASSIGNMENT_ROUTES),
  },
  {
    path: 'chapters/:chapterId',
    resolve: {chapter: chapterResolver},
    data: {
      breadcrumb: (data: ChapterResolverData) => data.chapter.title
    },
    loadChildren: () => import('@features/chapter/routes/student-chapter.routes').then(m => m.STUDENT_CHAPTER_ROUTES)
  }
]
