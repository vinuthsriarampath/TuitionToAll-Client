import {CourseLanguage} from '@features/course/enums/course-language';
import {CourseLevel} from '@features/course/enums/course-level';
import {CourseCategory} from '@features/course/enums/course-category';
import {CourseMode} from '@features/course/enums/course-mode';

export class TeacherCourseResponse {
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
