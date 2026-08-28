import { DashboardKpi } from "@shared/utils/response/dashboard-kpi";
import {OverallEnrollmentResponse} from '@features/student-batch-enrollment/dtos/responses/overall-enrollment-response';
import {
  EnrollmentDistributionResponse
} from '@features/student-batch-enrollment/dtos/responses/enrollment-distribution-response';

export class EnrollmentMetricsUpdatedResponse {
  studentKpi!: DashboardKpi;
  revenueKpi!: DashboardKpi;
  overallEnrollment!: OverallEnrollmentResponse;
  enrollmentDistribution!: EnrollmentDistributionResponse;
}
