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
import {LandingPageComponent} from '@shared/pages/landing-page/landing-page.component';
import {LoginPageComponent} from '@features/auth/pages/login-page/login-page.component';
import {tokenGuard} from '@core/guards/token-guard/token.guard';
import {SignupPageComponent} from '@features/auth/pages/signup-page/signup-page.component';
import {UnderDevelopmentPageComponent} from '@shared/pages/under-development-page/under-development-page.component';
import {authGuard} from '@core/guards/auth-guard/auth.guard';
import {UserProfileComponent} from '@features/profile/pages/user-profile/user-profile.component';
import {PageNotFoundComponent} from '@shared/pages/page-not-found/page-not-found.component';
import {
  ResetPasswordRequestPageComponent
} from '@features/auth/pages/reset-password-request-page/reset-password-request-page.component';
import {PasswordResetPageComponent} from '@features/auth/pages/password-reset-page/password-reset-page.component';
import {AppComponent} from '@core/layouts/app/app.component';
import {FeedComponent} from '@features/feed/feed.component';
import {InstituteDashboardComponent} from '@features/dashboards/institute-dashboard/institute-dashboard.component';
import {instituteRoleGuard} from '@core/guards/institute-role-guard/institute-role.guard';
import {DashboardComponent} from '@features/institute/pages/dashboard/dashboard.component';
import {
  InstituteCourseManagementComponent
} from '@features/institute/pages/institute-course-management/institute-course-management.component';
import {CourseCreateComponent} from '@features/course/pages/course-create/course-create.component';
import {CourseViewComponent} from '@features/course/pages/course-view/course-view.component';
import {CourseUpdateComponent} from '@features/course/pages/course-update/course-update.component';
import {BatchManagementComponent} from '@features/batch/pages/batch-management/batch-management.component';
import {BatchViewComponent} from '@features/batch/pages/batch-view/batch-view.component';
import {
  InstituteTeacherManagementComponent
} from '@features/institute/pages/institute-teacher-management/institute-teacher-management.component';
import {
  ViewTeacherVacancyComponent
} from '@features/teacher-vacancy/pages/view-teacher-vacancy/view-teacher-vacancy.component';
import {JobApplicationComponent} from '@features/profile/pages/job-application/job-application.component';
import {ViewApplicationComponent} from '@features/applications/pages/view-application/view-application.component';
import {
  AnnouncementsManagementComponent
} from '@features/announcement/pages/announcements-management/announcements-management.component';
import {ViewAnnouncementComponent} from '@features/announcement/pages/view-announcement/view-announcement.component';
import {
  CourseAnnouncementViewComponent
} from '@features/course/components/course-announcement-view/course-announcement-view.component';
import {ModuleViewComponent} from '@features/module/pages/module-view/module-view.component';
import {ChapterViewComponent} from '@features/chapter/pages/chapter-view/chapter-view.component';
import {
  LectureRecordWatchComponent
} from '@features/lecture-record/pages/lecture-record-watch/lecture-record-watch.component';
import {AssignmentCreateComponent} from '@features/assignments/pages/assignment-create/assignment-create.component';
import {AssignmentUpdateComponent} from '@features/assignments/pages/assignment-update/assignment-update.component';
import {AssignmentViewComponent} from '@features/assignments/pages/assignment-view/assignment-view.component';
import {courseResolver} from '@features/course/resolvers/course.resolver';
import {announcementResolver} from '@features/announcement/resolvers/announcement.resolver';
import {batchResolver} from '@features/batch/resolvers/batch.resolver';
import {modulesResolver} from '@features/module/resolvers/modules.resolver';
import {assignmentResolver} from '@features/assignments/resolvers/assignment.resolver';
import {chapterResolver} from '@features/chapter/resolvers/chapter.resolver';
import {teacherVacancyResolver} from '@features/teacher-vacancy/resolvers/teacher-vacancy.resolver';
import {CourseResolverData} from '@features/course/resolvers/course-resolver-data';
import {ModuleResolverData} from '@features/module/resolvers/module-resolver-data';
import {BatchResolverData} from '@features/batch/resolvers/batch-resolver-data';
import {AssignmentResolverData} from '@features/assignments/resolvers/assignment-resolver-data';
import {AnnouncementResolverData} from '@features/announcement/resolvers/announcement-resolver-data';
import {ChapterResolverData} from '@features/chapter/resolvers/chapter-resolver-data';
import {TeacherVacancyResolverData} from '@features/teacher-vacancy/resolvers/teacher-vacancy-resolver-data';
import {CourseCheckoutComponent} from '@features/profile/pages/course-checkout/course-checkout.component';


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
    data : {
      breadcrumb: 'Home',
    },
    children:[
      {
        path: '',
        component: DashboardComponent,
        data : {
          breadcrumb: 'Dashboard',
        },
      },
      {
        path: 'course-mgt',
        data:{
          breadcrumb:'Courses'
        },
        children:[
          {
            path: '',
            component: InstituteCourseManagementComponent,
            data : {
              breadcrumb: null,
            },
          },
          {
            path: 'create',
            component: CourseCreateComponent,
            data:{
              breadcrumb:'Create'
            }
          },
          {
            path: ':courseId',
            resolve: {
              course: courseResolver
            },
            data: {
              breadcrumb: (data:CourseResolverData)=>data.course.title
            },
            children:[
              {
                path: '',
                component: CourseViewComponent,
                data: {
                  breadcrumb: null
                },
              },
              {
                path: 'update',
                component: CourseUpdateComponent,
                data: {
                  breadcrumb: 'Update'
                }
              },
              {
                path: 'announcements',
                data: {
                  breadcrumb: 'Announcements'
                },
                children:[
                  {
                    path:'',
                    component: CourseAnnouncementViewComponent,
                    data: {
                      breadcrumb: null
                    },
                  },
                  {
                    path: ':announcementId',
                    component: ViewAnnouncementComponent,
                    resolve: {
                      announcement: announcementResolver
                    },
                    data:{
                      breadcrumb: (data:AnnouncementResolverData)=> data.announcement.title
                    }
                  }
                ]
              },
              {
                path: 'batch-mgt',
                data:{
                  breadcrumb: 'Batches'
                },
                children:[
                  {
                    path: '',
                    component: BatchManagementComponent,
                    data:{
                      breadcrumb: null
                    },
                  },
                  {
                    path: ':batchId',
                    resolve: {
                      batch: batchResolver
                    },
                    data: {
                      breadcrumb: (data:BatchResolverData)=>data.batch.name
                    },
                    children:[
                      {
                        path: '',
                        component: BatchViewComponent,
                        data:{
                          breadcrumb: null
                        },
                      },
                      {
                        path: 'modules',
                        data:{
                          breadcrumb: null
                        },
                        children:[
                          {
                            path: ':moduleId',
                            resolve: {
                              module: modulesResolver
                            },
                            data: {
                              breadcrumb: (data:ModuleResolverData) => data.module.name
                            },
                            children:[
                              {
                                path: '',
                                component: ModuleViewComponent,
                                data:{
                                  breadcrumb: null
                                }
                              },
                              {
                                path:'assignments',
                                data:{
                                  breadcrumb: 'Assignments'
                                },
                                children:[
                                  {
                                    path: 'create',
                                    component: AssignmentCreateComponent,
                                    data:{
                                      breadcrumb: 'Create'
                                    }
                                  },
                                  {
                                    path: ':assignmentId',
                                    resolve: {
                                      assignment: assignmentResolver
                                    },
                                    data:{
                                      breadcrumb: (data:AssignmentResolverData)=>data.assignment.topic
                                    },
                                    children:[
                                      {
                                        path: 'update',
                                        component: AssignmentUpdateComponent,
                                        data:{
                                          breadcrumb: "Update"
                                        },
                                      },
                                      {
                                        path:'view',
                                        component: AssignmentViewComponent,
                                        data:{
                                          breadcrumb: "View"
                                        }
                                      }
                                    ]
                                  },
                                ]
                              },
                              {
                                path:'chapters',
                                data: {
                                  breadcrumb: null
                                },
                                children: [
                                  {
                                    path: ':chapterId',
                                    resolve: {
                                      chapter: chapterResolver
                                    },
                                    data: {
                                      breadcrumb: (data: ChapterResolverData) => data.chapter.title
                                    },
                                    children: [
                                      {
                                        path: '',
                                        component: ChapterViewComponent,
                                        data: {
                                          breadcrumb: null
                                        }
                                      },
                                      {
                                        path: 'watch',
                                        component: LectureRecordWatchComponent,
                                        data: {
                                          breadcrumb: 'Watch'
                                        }
                                      },
                                      {
                                        path: 'assignments',
                                        data: {
                                          breadcrumb: 'Assignments'
                                        },
                                        children: [
                                          {
                                            path: 'create',
                                            component: AssignmentCreateComponent,
                                            data:{
                                              breadcrumb: 'Create'
                                            }
                                          },
                                          {
                                            path: ':assignmentId',
                                            resolve: {
                                              assignment: assignmentResolver
                                            },
                                            data:{
                                              breadcrumb: (data:AssignmentResolverData)=>data.assignment.topic
                                            },
                                            children:[
                                              {
                                                path: 'update',
                                                component: AssignmentUpdateComponent,
                                                data:{
                                                  breadcrumb: "Update"
                                                },
                                              },
                                              {
                                                path:'view',
                                                component: AssignmentViewComponent,
                                                data:{
                                                  breadcrumb: "View"
                                                }
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
        data: {
          breadcrumb: 'Teachers'
        },
        children:[
          {
            path: '',
            component: InstituteTeacherManagementComponent,
            data:{
              breadcrumb: null
            }
          },
          {
            path: 'vacancies',
            data : {
              breadcrumb: 'Vacancies'
            },
            children: [
              {
                path: '',
                component: ViewTeacherVacancyComponent,
                data: {
                  breadcrumb: null
                }
              },
              {
                path: ':vacancyId/applications',
                component: ViewApplicationComponent,
                resolve: {
                  vacancy: teacherVacancyResolver
                },
                data: {
                  breadcrumb: (data:TeacherVacancyResolverData) => data.vacancy.title + "- Applications"
                }
              }
            ]
          }
        ]
      },
      {
        path: "announcements-mgt",
        data: {
          breadcrumb: 'Announcements'
        },
        children:[
          {
            path: '',
            component: AnnouncementsManagementComponent,
            data: {
              breadcrumb: null
            },
          },
          {
            path: ':announcementId',
            component: ViewAnnouncementComponent,
            resolve: {
              announcement: announcementResolver
            },
            data:{
              breadcrumb: (data:AnnouncementResolverData)=> data.announcement.title
            }
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
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
