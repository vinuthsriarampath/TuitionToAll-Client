import {Routes} from '@angular/router';
import {chapterResolver} from '@features/chapter/resolvers/chapter.resolver';
import {ChapterResolverData} from '@features/chapter/resolvers/chapter-resolver-data';

export const INSTITUTE_CHAPTER_ROUTES: Routes = [
  {
    path: ':chapterId',
    resolve: {chapter: chapterResolver},
    data: {breadcrumb: (data: ChapterResolverData) => data.chapter.title},
    children: [
      {
        path: '',
        data: {breadcrumb: null},
        title: (route) => route.parent?.data['chapter'].title,
        loadComponent: () => import('@features/chapter/pages/chapter-view/chapter-view.component').then(m => m.ChapterViewComponent)
      },
      {
        path: 'watch',
        data: {breadcrumb: 'Watch'},
        title: 'lecture Recordings',
        loadComponent: () => import('@features/lecture-record/pages/lecture-record-watch/lecture-record-watch.component').then(m => m.LectureRecordWatchComponent)
      },
      {
        path: 'assignments',
        data: {breadcrumb: 'Assignments'},
        loadChildren: () => import('@features/assignments/routes/institute-assignment.routes').then(m => m.INSTITUTE_ASSIGNMENT_ROUTES)
      }
    ]
  }
]
