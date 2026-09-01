import {Routes} from '@angular/router';
import {
  InstituteTeacherManagementComponent
} from '@features/institute/pages/institute-teacher-management/institute-teacher-management.component';
import {
  ViewTeacherVacancyComponent
} from '@features/teacher-vacancy/pages/view-teacher-vacancy/view-teacher-vacancy.component';
import {ViewApplicationComponent} from '@features/applications/pages/view-application/view-application.component';
import {teacherVacancyResolver} from '@features/teacher-vacancy/resolvers/teacher-vacancy.resolver';
import {TeacherVacancyResolverData} from '@features/teacher-vacancy/resolvers/teacher-vacancy-resolver-data';

export const INSTITUTE_TEACHER_ROUTES: Routes = [
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
