import {DashboardStats} from '@shared/utils/response/dashboard-stats';

export class StudentDashboardStats {
  enrolledCourses!: DashboardStats;
  pendingAssignments!: DashboardStats;
  completedAssignments!: DashboardStats;
  averageMarks!: DashboardStats;
}
