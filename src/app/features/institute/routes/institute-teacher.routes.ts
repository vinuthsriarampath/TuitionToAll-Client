import {Routes} from '@angular/router';
import {teacherVacancyResolver} from '@features/teacher-vacancy/resolvers/teacher-vacancy.resolver';
import {TeacherVacancyResolverData} from '@features/teacher-vacancy/resolvers/teacher-vacancy-resolver-data';

export const INSTITUTE_TEACHER_ROUTES: Routes = [
  {
    path: '',
    title: 'Institute Teachers',
    data:{breadcrumb: null},
    loadComponent: () => import('@features/institute/pages/institute-teacher-management/institute-teacher-management.component').then(m => m.InstituteTeacherManagementComponent)
  },
  {
    path: 'vacancies',
    data : {
      breadcrumb: 'Vacancies'
    },
    children: [
      {
        path: '',
        data: {breadcrumb: null},
        loadComponent: () => import('@features/teacher-vacancy/pages/view-teacher-vacancy/view-teacher-vacancy.component').then(m => m.ViewTeacherVacancyComponent)
      },
      {
        path: ':vacancyId/applications',
        resolve: {vacancy: teacherVacancyResolver},
        data: {breadcrumb: (data:TeacherVacancyResolverData) => data.vacancy.title + "- Applications"},
        loadComponent: () => import('@features/applications/pages/view-application/view-application.component').then(m => m.ViewApplicationComponent),
      }
    ]
  }
]
