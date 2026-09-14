import {Routes} from '@angular/router';

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
  }
]
