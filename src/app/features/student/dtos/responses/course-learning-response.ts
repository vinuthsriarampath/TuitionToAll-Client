import {CurrentEnrollmentResponse} from '@features/student/dtos/responses/current-enrollment-response';
import {CourseCategory} from '@features/course/enums/course-category';
import {CourseLevel} from '@features/course/enums/course-level';
import {CourseLanguage} from '@features/course/enums/course-language';
import {CourseMode} from '@features/course/enums/course-mode';

export class CourseLearningResponse{
  id!: number;
  title!: string;
  description!: string;
  thumbnail!: string;
  category!: CourseCategory;
  level!: CourseLevel;
  language!: CourseLanguage;
  mode!: CourseMode;
  averageRating!: number;
  totalRatings!: number;

  currentEnrollment!: CurrentEnrollmentResponse;

  enrollmentHistoryAvailable!: boolean;
}
