import {AssignmentType} from '@features/assignments/enums/assignment-type';

export class UpcomingAssignmentResponse {
  assignmentType!: AssignmentType;
  assignmentId!: number;
  title!: string;
  dueDate!: string;
  courseId!: number;
  batchId!: number;
  moduleId!: number;
  chapterId!: number;
}
