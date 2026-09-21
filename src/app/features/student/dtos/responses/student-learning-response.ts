import {CourseLearningResponse} from '@features/student/dtos/responses/course-learning-response';

export class StudentLearningResponse {
  instituteId!: number;
  instituteName!: string;
  courses!: CourseLearningResponse[];
}
