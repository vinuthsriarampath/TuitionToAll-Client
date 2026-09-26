import {StudentDashboardStats} from '@features/student/dtos/responses/student-dashboard-stats';
import {UpcomingAssignmentResponse} from '@features/assignments/dtos/response/upcoming-assignment-response';
import {RecentEnrollmentResponse} from '@features/student/dtos/responses/recent-enrollment-response';
import {RecentResultsResponse} from '@features/student/dtos/responses/recent-results-response';

export class StudentBootstrapResponse {
  dashboardStats!: StudentDashboardStats;
  upcomingAssignments!: UpcomingAssignmentResponse[];
  recentEnrollments!: RecentEnrollmentResponse[];
  recentResults!: RecentResultsResponse[];
}
