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

@Injectable({
  providedIn: 'root'
})
export class InstituteDashboardWebsocketService {

  private readonly stomp = inject(StompClientService);

  readonly enrollmentMetricsUpdated = signal<EnrollmentMetricsUpdatedResponse | null>(null);
  private instituteEnrollmentMetricsSubscription?: StompSubscription;

  readonly teacherMetricsUpdated = signal<InstituteTeacherMetricsUpdatedResponse | null>(null);
  private instituteTeacherMetricsSubscription?: StompSubscription;

  readonly courseMetricsUpdated = signal<InstituteCourseMetricsUpdatedResponse | null>(null);
  private instituteCourseMetricsSubscription?: StompSubscription;

  readonly batchMetricsUpdated = signal<InstituteBatchMetricsUpdatedResponse | null>(null);
  private instituteBatchMetricsSubscription?: StompSubscription;

  subscribeToInstituteEnrollmentMetrics(instituteId: number): void {

    if (!this.stomp.connected()) {
      console.warn('[STOMP] Cannot subscribe before connection');
      return;
    }

    const destination = `/topic/institute/${instituteId}/enrollment-metrics`;

    this.instituteEnrollmentMetricsSubscription =
      this.stomp.subscribe(destination, message => {
        const response: EnrollmentMetricsUpdatedResponse = JSON.parse(message.body);
        console.log('[STOMP] Dashboard enrollment metrics updated:', response);
        this.enrollmentMetricsUpdated.set(response);
      });

    console.log(`[STOMP] Subscribed to ${destination}`);
  }

  unsubscribeFromInstituteEnrollmentMetrics(): void {

    if (!this.instituteEnrollmentMetricsSubscription) {
      return;
    }

    console.log('[STOMP] Unsubscribing from institute enrollment metrics');

    this.instituteEnrollmentMetricsSubscription.unsubscribe();
    this.instituteEnrollmentMetricsSubscription = undefined;
    this.enrollmentMetricsUpdated.set(null);
  }

  subscribeToTeacherMetrics(instituteId: number): void {
    if (!this.stomp.connected()) {
      console.warn('[STOMP] Cannot subscribe before connection');
      return;
    }

    const destination = `/topic/institute/${instituteId}/active-teacher-metrics`;

    this.instituteTeacherMetricsSubscription =
      this.stomp.subscribe(destination, message => {
        const response: InstituteTeacherMetricsUpdatedResponse = JSON.parse(message.body);
        console.log('[STOMP] Dashboard active teacher metrics updated:', response);
        this.teacherMetricsUpdated.set(response);
      });

    console.log(`[STOMP] Subscribed to ${destination}`);
  }

  unsubscribeToTeacherMetrics(): void {
    if(!this.instituteTeacherMetricsSubscription) {
      return;
    }

    console.log('[STOMP] Unsubscribing from institute active teacher metrics');

    this.instituteTeacherMetricsSubscription.unsubscribe();
    this.instituteTeacherMetricsSubscription = undefined;
    this.teacherMetricsUpdated.set(null);
  }

  subscribeToCourseMetrics(instituteId: number): void {
    if(!this.stomp.connected()) {
      console.warn('[STOMP] Cannot subscribe before connection');
      return;
    }

    const destination = `/topic/institute/${instituteId}/course-metrics`;

    this.instituteCourseMetricsSubscription = this.stomp.subscribe(destination, message => {
      const response: InstituteCourseMetricsUpdatedResponse = JSON.parse(message.body);
      console.log('[STOMP] Dashboard course metrics updated:', response);
      this.courseMetricsUpdated.set(response);
    });

    console.log(`[STOMP] Subscribed to ${destination}`);
  }

  unsubscribeToCourseMetrics(): void {
    if(!this.instituteCourseMetricsSubscription) {
      return;
    }

    console.log('[STOMP] Unsubscribing from institute course metrics');

    this.instituteCourseMetricsSubscription.unsubscribe();
    this.instituteCourseMetricsSubscription = undefined;
    this.courseMetricsUpdated.set(null);
  }


  subscribeToBatchMetrics(instituteId: number): void {
    if (!this.stomp.connected()) {
      console.warn('[STOMP] Cannot subscribe before connection');
      return;
    }

    const destination = `/topic/institute/${instituteId}/batch-metrics`;

    this.instituteBatchMetricsSubscription = this.stomp.subscribe(destination, message => {
      const response: InstituteBatchMetricsUpdatedResponse = JSON.parse(message.body);
      console.log("[STOMP] Dashboard batch metrics updated:", response);
      this.batchMetricsUpdated.set(response);
    });

    console.log(`[STOMP] Subscribed to ${destination}`);
  }

  unsubscribeToBatchMetrics(): void {
    if(!this.instituteBatchMetricsSubscription){
      return;
    }

    console.log('[STOMP] Unsubscribing from institute batch metrics');

    this.instituteBatchMetricsSubscription.unsubscribe();
    this.instituteBatchMetricsSubscription = undefined;
    this.batchMetricsUpdated.set(null);
  }
}
