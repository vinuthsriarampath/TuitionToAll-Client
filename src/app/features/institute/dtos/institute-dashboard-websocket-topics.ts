export class InstituteDashboardWebSocketTopics {

  static enrollmentMetrics(instituteId: number): string {
    return `/topic/institute/${instituteId}/enrollment-metrics`;
  }

  static teacherMetrics(instituteId: number): string {
    return `/topic/institute/${instituteId}/active-teacher-metrics`;
  }

  static courseMetrics(instituteId: number): string {
    return `/topic/institute/${instituteId}/course-metrics`;
  }

  static batchMetrics(instituteId: number): string {
    return `/topic/institute/${instituteId}/batch-metrics`;
  }
}
