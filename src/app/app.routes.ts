/*
 * Copyright (c) 2025 vinuth sri arampath
 *
 * This code is the intellectual property of vinuth sri arampath and is protected under copyright law.
 * Unauthorized copying, modification, distribution, or use of this code, in whole or in part,
 * without prior written permission is strictly prohibited.
 *
 * Portions of this code may be generated with AI and modified by vinuth sri arampath
 * All rights reserved.
 */

import {Routes} from '@angular/router';
import {LandingPageComponent} from './shared/pages/landing-page/landing-page.component';
import {LoginPageComponent} from './features/auth/pages/login-page/login-page.component';
import {tokenGuard} from './core/guards/token-guard/token.guard';
import {SignupPageComponent} from './features/auth/pages/signup-page/signup-page.component';
import {UnderDevelopmentPageComponent} from './shared/pages/under-development-page/under-development-page.component';
import {authGuard} from './core/guards/auth-guard/auth.guard';
import {UserProfileComponent} from './features/profile/pages/user-profile/user-profile.component';
import {PageNotFoundComponent} from './shared/pages/page-not-found/page-not-found.component';
import {
  ResetPasswordRequestPageComponent
} from './features/auth/pages/reset-password-request-page/reset-password-request-page.component';
import {PasswordResetPageComponent} from './features/auth/pages/password-reset-page/password-reset-page.component';
import {AppComponent} from './core/layouts/app/app.component';
import {FeedComponent} from './features/feed/feed.component';
import {InstituteDashboardComponent} from './features/dashboards/institute-dashboard/institute-dashboard.component';
import {instituteRoleGuard} from './core/guards/institute-role-guard/institute-role.guard';
import {DashboardComponent} from './features/dashboards/institute-dashboard/pages/dashboard/dashboard.component';
import {
  InstituteCourseManagementComponent
} from './features/dashboards/institute-dashboard/pages/institute-course-management/institute-course-management.component';
import {
  CourseCreateComponent
} from './features/dashboards/institute-dashboard/pages/institute-course-management/pages/course-create/course-create.component';
import {
  CourseViewComponent
} from './features/dashboards/institute-dashboard/pages/institute-course-management/pages/course-view/course-view.component';
import {
  CourseUpdateComponent
} from './features/dashboards/institute-dashboard/pages/institute-course-management/pages/course-update/course-update.component';
import {
  BatchManagementComponent
} from './features/dashboards/institute-dashboard/pages/institute-course-management/pages/course-view/pages/batch-management/batch-management.component';
import {
  BatchViewComponent
} from './features/dashboards/institute-dashboard/pages/institute-course-management/pages/course-view/pages/batch-management/pages/batch-view/batch-view.component';
import {
  InstituteTeacherManagementComponent
} from './features/dashboards/institute-dashboard/pages/institute-teacher-management/institute-teacher-management.component';
import {
  ViewTeacherVacancyComponent
} from './features/teacher-vacancy/pages/view-teacher-vacancy/view-teacher-vacancy.component';
import {JobApplicationComponent} from './features/profile/pages/job-application/job-application.component';
import {
  ViewApplicationComponent
} from './features/dashboards/institute-dashboard/pages/institute-teacher-management/pages/view-application/view-application.component';
import {
  AnnouncementsManagementComponent
} from './features/announcement/pages/announcements-management/announcements-management.component';
import {
  ViewAnnouncementComponent
} from './features/announcement/pages/view-announcement/view-announcement.component';
import {
  CourseAnnouncementViewComponent
} from './features/dashboards/institute-dashboard/pages/institute-course-management/pages/course-view/components/course-announcement-view/course-announcement-view.component';
import {
  ModuleViewComponent
} from './features/dashboards/institute-dashboard/pages/institute-course-management/pages/course-view/pages/batch-management/pages/batch-view/components/module-view/module-view.component';
import {
  ChapterViewComponent
} from './features/dashboards/institute-dashboard/pages/institute-course-management/pages/course-view/pages/batch-management/pages/batch-view/components/chapter-view/chapter-view.component';
import {
  LectureRecordWatchComponent
} from './features/dashboards/institute-dashboard/pages/institute-course-management/pages/course-view/pages/batch-management/pages/batch-view/components/lecture-record-watch/lecture-record-watch.component';


export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [tokenGuard]
  },
  {
    path: 'auth/login',
    component: LoginPageComponent
  },
  {
    path: 'auth/signup',
    component: SignupPageComponent
  },
  {
    path: 'auth/reset-password/request',
    component: ResetPasswordRequestPageComponent
  },
  {
    path: 'reset',
    component: PasswordResetPageComponent
  },
  {
    path:'maintenance',
    component:UnderDevelopmentPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'app',
    component: AppComponent,
    canActivate: [tokenGuard,authGuard],
    canActivateChild: [tokenGuard,authGuard],

    children: [
      {
        path:'',
        component:FeedComponent
      },

    ]
  },
  {
    path: 'ins/dashboard',
    component:InstituteDashboardComponent,
    canActivate: [authGuard,tokenGuard],
    canActivateChild: [instituteRoleGuard],
    children:[
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'course-mgt',
        children:[
          {
            path: '',
            component: InstituteCourseManagementComponent,
          },
          {
            path: 'create',
            component: CourseCreateComponent
          },
          {
            path: ':courseId',
            children:[
              {
                path: '',
                component: CourseViewComponent,
              },
              {
                path: 'announcements',
                children:[
                  {
                    path:'',
                    component: CourseAnnouncementViewComponent
                  },
                  {
                    path: ':announcementId',
                    component: ViewAnnouncementComponent
                  }
                ]
              },
              {
                path: 'update',
                component: CourseUpdateComponent
              },
              {
                path: 'batch-mgt',
                children:[
                  {
                    path: '',
                    component: BatchManagementComponent
                  },
                  {
                    path: ':batchId',
                    children:[
                      {
                        path: '',
                        component: BatchViewComponent
                      },
                      {
                        path: 'modules',
                        children:[
                          {
                            path: ':moduleId',
                            children:[
                              {
                                path: '',
                                component: ModuleViewComponent
                              },
                              {
                                path: 'chapters/:chapterId',
                                children:[
                                  {
                                    path:'',
                                    component:ChapterViewComponent
                                  },
                                  {
                                    path:'watch',
                                    component:LectureRecordWatchComponent
                                  }
                                ]
                              }
                            ]
                          },
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: "teacher-mgt",
        children:[
          {
            path: '',
            component: InstituteTeacherManagementComponent
          },
          {
            path: 'vacancies',
            children: [
              {
                path: '',
                component: ViewTeacherVacancyComponent
              },
              {
                path: ':vacancyId/applications',
                component: ViewApplicationComponent
              }
            ]
          }
        ]
      },
      {
        path: "announcements-mgt",
        children:[
          {
            path: '',
            component: AnnouncementsManagementComponent
          },
          {
            path: ':announcementId',
            component: ViewAnnouncementComponent
          }
        ]
      }
    ]
  },
  {
    path: "profile/:userSlug/:vacancyId/apply",
    component: JobApplicationComponent
  },
  {
    path: 'profile/:userSlug',
    component: UserProfileComponent,
    canActivate: [authGuard,tokenGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
