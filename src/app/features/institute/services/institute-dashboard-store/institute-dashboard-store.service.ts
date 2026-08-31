import {Injectable, signal} from '@angular/core';
import {InstituteBootstrapResponse} from '@features/institute/dtos/response/institute-bootstrap-response';
import {
  EnrollmentMetricsUpdatedResponse
} from '@features/student-batch-enrollment/responses/EnrollmentMetricsUpdatedResponse';
import {
  InstituteTeacherMetricsUpdatedResponse
} from '@features/institute/dtos/response/institute-teacher-responses/institute-teacher-metrics-updated-response';
import {
  InstituteCourseMetricsUpdatedResponse
} from '@features/course/dtos/response/institute-course-metrics-updated-response';
import {
  InstituteBatchMetricsUpdatedResponse
} from '@features/batch/dtos/response/institute-batch-metrics-updated-response';

@Injectable({
  providedIn: 'root'
})
export class InstituteDashboardStoreService {
  private readonly _dashboard = signal<InstituteBootstrapResponse>(new InstituteBootstrapResponse());
  readonly dashboard = this._dashboard.asReadonly();

  setBootstrapData(data: InstituteBootstrapResponse): void {
    this._dashboard.set(data);
  }

  applyEnrollmentMetrics(update: EnrollmentMetricsUpdatedResponse): void {

    const current = this._dashboard();

    this._dashboard.set({
      ...current,

      kpiStats: {
        ...current.kpiStats,
        activeStudents: update.studentKpi,
        revenue: update.revenueKpi
      },

      overallEnrollment: update.overallEnrollment,
      enrollmentDistribution: update.enrollmentDistribution
    });
  }

  applyTeacherMetrics( update: InstituteTeacherMetricsUpdatedResponse ): void {

    const current = this._dashboard();

    this._dashboard.set({
      ...current,

      kpiStats: {
        ...current.kpiStats,
        activeTeachers: update.activeTeachers
      }
    });
  }

  applyCourseMetrics(update: InstituteCourseMetricsUpdatedResponse): void {

    const current = this._dashboard();

    this._dashboard.set({
      ...current,

      kpiStats: {
        ...current.kpiStats,
        publishedCourses: update.publishedCourses
      }
    });
  }

  applyBatchMetrics(update: InstituteBatchMetricsUpdatedResponse): void {

    const current = this._dashboard();

    this._dashboard.set({
      ...current,

      kpiStats: {
        ...current.kpiStats,
        ongoingBatches: update.ongoingBatches
      }
    });
  }
}
