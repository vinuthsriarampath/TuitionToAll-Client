import {BatchBasicResponse} from '@features/batch/dtos/response/BatchBasicResponse';
import {CourseMode} from '@features/course/enums/course-mode';
import {CourseCategory} from '@features/course/enums/course-category';
import {CourseLevel} from '@features/course/enums/course-level';
import {CourseLanguage} from '@features/course/enums/course-language';

export class CourseTeachingResponse {
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
  assignedBatches!: BatchBasicResponse[];
}
