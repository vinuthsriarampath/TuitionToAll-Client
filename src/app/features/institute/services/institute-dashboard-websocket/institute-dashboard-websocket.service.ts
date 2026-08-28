import {inject, Injectable, signal} from '@angular/core';
import {
  EnrollmentMetricsUpdatedResponse
} from '@features/student-batch-enrollment/responses/EnrollmentMetricsUpdatedResponse';
import {StompSubscription} from '@stomp/stompjs';
import {StompClientService} from '@core/services/stomp/stomp-client.service';

@Injectable({
  providedIn: 'root'
})
export class InstituteDashboardWebsocketService {

  private readonly stomp = inject(StompClientService);

  readonly enrollmentMetricsUpdated = signal<EnrollmentMetricsUpdatedResponse | null>(null);
  private instituteEnrollmentMetricsSubscription?: StompSubscription;

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

}
