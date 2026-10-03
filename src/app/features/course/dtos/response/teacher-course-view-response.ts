import {TeacherCourseResponse} from '@features/course/dtos/response/teacher-course-response';
import {TeacherBatchResponse} from '@features/batch/dtos/response/teacher-batch-response';

export class TeacherCourseViewResponse {
  course!: TeacherCourseResponse;
  batches!: TeacherBatchResponse[];
}
