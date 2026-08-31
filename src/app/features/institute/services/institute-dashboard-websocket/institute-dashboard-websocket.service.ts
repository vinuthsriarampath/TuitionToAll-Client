import {inject, Injectable, signal} from '@angular/core';
import {
  EnrollmentMetricsUpdatedResponse
} from '@features/student-batch-enrollment/responses/EnrollmentMetricsUpdatedResponse';
import {StompSubscription} from '@stomp/stompjs';
import {StompClientService} from '@core/services/stomp/stomp-client.service';
import {
  InstituteTeacherMetricsUpdatedResponse
} from '@features/institute/dtos/response/institute-teacher-responses/institute-teacher-metrics-updated-response';
import {InstituteCourseMetricsUpdatedResponse} from '@features/course/dtos/response/institute-course-metrics-updated-response';
import {InstituteBatchMetricsUpdatedResponse} from '@features/batch/dtos/response/institute-batch-metrics-updated-response';
import { InstituteDashboardWebSocketTopics } from "@features/institute/dtos/institute-dashboard-websocket-topics";
import {
  InstituteDashboardStoreService
} from '@features/institute/services/institute-dashboard-store/institute-dashboard-store.service';

@Injectable({
  providedIn: 'root'
})
export class InstituteDashboardWebsocketService {

  private readonly stomp = inject(StompClientService);

  readonly dashboardStore = inject(InstituteDashboardStoreService);

  private instituteId?: number;

  connect(instituteId: number): void {

    this.instituteId = instituteId;

    this.stomp.subscribe(
      InstituteDashboardWebSocketTopics.enrollmentMetrics(instituteId),
      message => {
        const response =
          JSON.parse(message.body) as EnrollmentMetricsUpdatedResponse;

        this.dashboardStore.applyEnrollmentMetrics(response);
      }
    );

    this.stomp.subscribe(
      InstituteDashboardWebSocketTopics.teacherMetrics(instituteId),
      message => {
        const response =
          JSON.parse(message.body) as InstituteTeacherMetricsUpdatedResponse;

        this.dashboardStore.applyTeacherMetrics(response);
      }
    );

    this.stomp.subscribe(
      InstituteDashboardWebSocketTopics.courseMetrics(instituteId),
      message => {
        const response =
          JSON.parse(message.body) as InstituteCourseMetricsUpdatedResponse;

        this.dashboardStore.applyCourseMetrics(response);
      }
    );

    this.stomp.subscribe(
      InstituteDashboardWebSocketTopics.batchMetrics(instituteId),
      message => {
        const response =
          JSON.parse(message.body) as InstituteBatchMetricsUpdatedResponse;

        this.dashboardStore.applyBatchMetrics(response);
      }
    );
  }


  disconnect(): void {

    if (!this.instituteId) {
      return;
    }

    this.stomp.unsubscribe(
      InstituteDashboardWebSocketTopics.enrollmentMetrics(this.instituteId)
    );

    this.stomp.unsubscribe(
      InstituteDashboardWebSocketTopics.teacherMetrics(this.instituteId)
    );

    this.stomp.unsubscribe(
      InstituteDashboardWebSocketTopics.courseMetrics(this.instituteId)
    );

    this.stomp.unsubscribe(
      InstituteDashboardWebSocketTopics.batchMetrics(this.instituteId)
    );

    this.instituteId = undefined;
  }
}
