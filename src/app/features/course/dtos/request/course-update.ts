import {CourseLevel} from '../../../enums/course-level';
import {CourseCategory} from '../../../enums/course-category';
import {CourseStatus} from '../../../enums/course-status';
import {CourseLanguage} from '../../../enums/course-language';
import {CourseMode} from '../../../enums/course-mode';

export class CourseUpdate{
  title?:string;
  description?:string;
  durationInHours?:number;
  price?:number;
  level?:CourseLevel;
  category?:CourseCategory;
  status?:CourseStatus;
  language?:CourseLanguage;
  mode?:CourseMode
}
