import {Routes} from '@angular/router';
import {courseResolver} from '@features/course/resolvers/course-resolver/course.resolver';
import {CourseResolverData} from '@features/course/resolvers/course-resolver/course-resolver-data';

export const TEACHER_COURSES_ROUTES: Routes = [
  {
    path: '',
    title: "My Teachings",
    data:{breadcrumb: null},
    loadComponent: () => import('@features/teacher/pages/teacher-courses/teacher-courses.component').then(m => m.TeacherCoursesComponent),
  },
  {
    path: 'courses/:courseId',
    resolve: {course: courseResolver},
    data: {
      breadcrumb: (data:CourseResolverData) => data.course.title
    },
    title: route => route.data['course'].title,
    loadComponent: () => import('@features/course/pages/teacher-course-view/teacher-course-view.component').then(m => m.TeacherCourseViewComponent),
  }
]
