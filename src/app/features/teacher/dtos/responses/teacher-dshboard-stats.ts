import {DashboardStats} from '@shared/utils/response/dashboard-stats';

export class TeacherDashboardStats {
  ongoingAssignedBatchesCount!: DashboardStats;
  publishedAssignedModulesCount!: DashboardStats;
  pendingEvaluationsCount!: DashboardStats;
}
