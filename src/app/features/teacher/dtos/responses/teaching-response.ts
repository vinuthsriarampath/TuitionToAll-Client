import {CourseTeachingResponse} from '@features/teacher/dtos/responses/course-teaching-response';

export class TeachingResponse {
  instituteId!: number;
  instituteName!: string;
  courses!: CourseTeachingResponse[];
}
