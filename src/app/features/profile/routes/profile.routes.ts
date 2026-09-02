import {Routes} from '@angular/router';
import {authGuard} from '@core/guards/auth-guard/auth.guard';
import {tokenGuard} from '@core/guards/token-guard/token.guard';
import {courseResolver} from '@features/course/resolvers/course.resolver';

export const PROFILE_ROUTES: Routes = [
  {
    path: ":vacancyId/apply",
    title: 'Apply for Job',
    loadComponent: () => import('@features/applications/pages/job-application/job-application.component').then(m => m.JobApplicationComponent)
  },
  {
    path: '',
    canActivate: [authGuard,tokenGuard],
    canActivateChild: [authGuard,tokenGuard],
    children: [
      {
        path: '',
        title: 'Profile',
        loadComponent: () => import('@features/profile/pages/user-profile/user-profile.component').then(m => m.UserProfileComponent)
      },
      {
        path: 'checkout/:courseId',
        resolve:{course: courseResolver},
        title: 'Checkout',
        loadComponent: () => import('@features/student-batch-enrollment/pages/course-checkout/course-checkout.component').then(m => m.CourseCheckoutComponent),
      }
    ]
  },
];
