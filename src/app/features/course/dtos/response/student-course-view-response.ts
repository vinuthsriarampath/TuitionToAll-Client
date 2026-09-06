import {StudentCourseResponse} from '@features/course/dtos/response/student-course-response';
import {StudentBatchResponse} from '@features/batch/dtos/response/student-batch-response';
import {StudentModuleResponse} from '@features/module/dtos/response/student-module-response';

export class StudentCourseViewResponse {
  course!: StudentCourseResponse;
  selectedBatch!: StudentBatchResponse;
  modules!: StudentModuleResponse[];
}
