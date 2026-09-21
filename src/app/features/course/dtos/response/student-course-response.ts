import {CourseMode} from '@features/course/enums/course-mode';
import {CourseLanguage} from '@features/course/enums/course-language';
import {CourseCategory} from '@features/course/enums/course-category';
import {CourseLevel} from '@features/course/enums/course-level';

export class StudentCourseResponse {
  id!: number;
  title!: string;
  description!: string;
  durationInHours!: number;
  level!: CourseLevel;
  category!: CourseCategory;
  language!: CourseLanguage;
  mode!: CourseMode;
  thumbnail!: string;
  avgRating!: number;
  totalRatings!: number;
}
