import {Routes} from '@angular/router';
import {assignmentResolver} from '@features/assignments/resolvers/assignment.resolver';

export const TEACHER_CHAPTER_ROUTES: Routes = [
  {
    path: '',
    data:{
      breadcrumb: null,

      canEditChapter: true,

      canUploadRecording: true,
      canEditLectureRecording: true,

      canScheduleLectures: true,
      canEditLectureSchedules: true,

      canAddAssignment: true,
      canEditAssignment: true,
      availableAssignmentsOnly: false,

      canUploadResources: true,
      canDeleteResources: true,
    },
    loadComponent: () => import('@features/chapter/pages/chapter-view/chapter-view.component').then(m => m.ChapterViewComponent),
  },
  {
    path: 'assignments',
    data:{breadcrumb: null},
    loadChildren: () => import('@features/assignments/routes/teacher-assignment.routes').then(m => m.TEACHER_ASSIGNMENT_ROUTES),
  },
  {
    path: 'watch',
    data: {breadcrumb: 'Watch'},
    title: 'lecture Recordings',
    loadComponent: () => import('@features/lecture-record/pages/lecture-record-watch/lecture-record-watch.component').then(m => m.LectureRecordWatchComponent)
  },
]
