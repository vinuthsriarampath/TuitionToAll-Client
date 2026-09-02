import {Routes} from '@angular/router';

export const INSTITUTE_COURSE_REVIEWS_AND_FEEDBACK_ROUTES: Routes = [
  {
    path: '',
    title: 'Feedbacks & Reviews',
    data: {breadcrumb: null},
    loadComponent: () => import('@features/course/pages/course-feedback-review/course-feedback-review.component').then(m => m.CourseFeedbackReviewComponent)
  }
];
