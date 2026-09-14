import {Routes} from '@angular/router';
import {assignmentResolver} from '@features/assignments/resolvers/assignment.resolver';

export const STUDENT_CHAPTER_ROUTES: Routes = [
  {
    path: '',
    data:{
      breadcrumb: null,

      canEditChapter: false,

      canUploadRecording: false,
      canEditLectureRecording: false,

      canScheduleLectures: false,
      canEditLectureSchedules: false,

      canAddAssignment: false,
      canEditAssignment: false,

      canUploadResources: false,
      canDeleteResources: false,
    },
    loadComponent: () => import('@features/chapter/pages/chapter-view/chapter-view.component').then(m => m.ChapterViewComponent),
  },
  {
    path: 'assignments/:assignmentId',
    resolve: {assignment: assignmentResolver},
    loadChildren: () => import('@features/assignments/routes/student-assignment.routes').then(m => m.STUDENT_ASSIGNMENT_ROUTES),
  },
  {
    path: 'watch',
    data: {breadcrumb: 'Watch'},
    title: 'lecture Recordings',
    loadComponent: () => import('@features/lecture-record/pages/lecture-record-watch/lecture-record-watch.component').then(m => m.LectureRecordWatchComponent)
  },
]
