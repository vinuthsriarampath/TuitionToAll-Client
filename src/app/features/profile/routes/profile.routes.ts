import {Routes} from '@angular/router';
import {JobApplicationComponent} from '@features/applications/pages/job-application/job-application.component';
import {authGuard} from '@core/guards/auth-guard/auth.guard';
import {tokenGuard} from '@core/guards/token-guard/token.guard';
import {UserProfileComponent} from '@features/profile/pages/user-profile/user-profile.component';
import {courseResolver} from '@features/course/resolvers/course.resolver';
import {
  CourseCheckoutComponent
} from '@features/student-batch-enrollment/pages/course-checkout/course-checkout.component';

export const PROFILE_ROUTES: Routes = [
  {
    path: ":vacancyId/apply",
    component: JobApplicationComponent
  },
  {
    path: '',
    canActivate: [authGuard,tokenGuard],
    canActivateChild: [authGuard,tokenGuard],
    children: [
      {
        path: '',
        component: UserProfileComponent
      },
      {
        path: 'checkout/:courseId',
        resolve:{
          course: courseResolver
        },
        component: CourseCheckoutComponent
      }
    ]
  },
];
