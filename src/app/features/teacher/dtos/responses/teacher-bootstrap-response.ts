import {ScheduleLectureResponse} from '@features/schedule-lectures/dtos/response/ScheduleLectureResponse';
import {TeacherDashboardStats} from '@features/teacher/dtos/responses/teacher-dshboard-stats';
import {TeacherBasicCourseResponse} from '@features/course/dtos/response/teacher-basic-course-response';
import {NonGradedSubmissionResponse} from '@features/grading/dtos/responses/non-graded-submission-response';

export class TeacherBootstrapResponse {
  stats!: TeacherDashboardStats;
  assignedPublishedCourses!: TeacherBasicCourseResponse[];
  upcomingLectureSchedules!: ScheduleLectureResponse[];
  nonGradedSubmissions!: NonGradedSubmissionResponse[];
}
