import {InstituteDashboardKpiStats} from '@features/institute/dtos/response/institute-dashboard-kpi-stats';
import {CoursePerformanceResponse} from '@features/course/dtos/response/course-performance-response';
import {
  EnrollmentDistributionResponse
} from '@features/student-batch-enrollment/dtos/responses/enrollment-distribution-response';
import {OverallEnrollmentResponse} from '@features/student-batch-enrollment/dtos/responses/overall-enrollment-response';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {BatchDetailedResponse} from '@features/batch/dtos/response/batch-detailed-response';

export class InstituteBootstrapResponse {
  kpiStats!: InstituteDashboardKpiStats;
  coursePerformance!: CoursePerformanceResponse[];
  enrollmentDistribution!: EnrollmentDistributionResponse;
  overallEnrollment!: OverallEnrollmentResponse;
  activeBatches!: PaginatedApiResponse<BatchDetailedResponse>;
}
