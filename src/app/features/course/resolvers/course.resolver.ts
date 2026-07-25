import { ResolveFn } from '@angular/router';
import {Course} from '@features/course/dtos/response/course';
import {inject} from '@angular/core';
import {CourseService} from '@features/course/services/course/course.service';

export const courseResolver: ResolveFn<Course> = (route, state) => {
  const courseService = inject(CourseService);
  return courseService.getCourseById(Number(route.paramMap.get('courseId')));
};
