import {CourseStatus} from '@features/course/enums/course-status';
import {CourseMode} from '@features/course/enums/course-mode';
import {CourseLanguage} from '@features/course/enums/course-language';
import {CourseLevel} from '@features/course/enums/course-level';
import {CourseCategory} from '@features/course/enums/course-category';

export class CourseFilter {
  title?:string;
  category?:CourseCategory;
  level?:CourseLevel;
  language?:CourseLanguage;
  mode?:CourseMode;
  status?:CourseStatus;
}
