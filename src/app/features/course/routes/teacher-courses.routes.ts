import {Routes} from '@angular/router';
import {teacherCourseResolver} from '@features/course/resolvers/teacher-course-resolver/teacher-course.resolver';
import {
  TeacherCourseResolverData
} from '@features/course/resolvers/teacher-course-resolver/teacher-course-resolver-data';

export const TEACHER_COURSES_ROUTES: Routes = [
  {
    path: '',
    title: "My Teachings",
    data:{breadcrumb: null},
    loadComponent: () => import('@features/teacher/pages/teacher-courses/teacher-courses.component').then(m => m.TeacherCoursesComponent),
  },
  {
    path: 'courses/:courseId',
    resolve: {course: teacherCourseResolver},
    data: {
      breadcrumb: (data:TeacherCourseResolverData) => data.course.course.title
    },

    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        title: route => route.parent?.data['course'].title,
        loadComponent: () => import('@features/course/pages/teacher-course-view/teacher-course-view.component').then(m => m.TeacherCourseViewComponent),
      }
    ]
  }
]
