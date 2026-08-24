import {InstituteDashboardKpiStats} from '@features/institute/dtos/response/institute-dashboard-kpi-stats';
import {CoursePerformanceResponse} from '@features/course/dtos/response/course-performance-response';

export class InstituteBootstrapResponse {
  kpiStats!: InstituteDashboardKpiStats;
  coursePerformance!: CoursePerformanceResponse[];
}
