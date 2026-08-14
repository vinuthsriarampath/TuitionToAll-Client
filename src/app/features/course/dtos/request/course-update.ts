import {CourseLevel} from "@features/course/enums/course-level";
import {CourseCategory} from '@features/course/enums/course-category';
import {CourseStatus} from '@features/course/enums/course-status';
import {CourseLanguage} from '@features/course/enums/course-language';
import {CourseMode} from '@features/course/enums/course-mode';


export class CourseUpdate{
  title!:string;
  description!:string;
  durationInHours!:number;
  price!:number;
  level!:CourseLevel;
  category!:CourseCategory;
  status!:CourseStatus;
  language!:CourseLanguage;
  mode!:CourseMode
}
