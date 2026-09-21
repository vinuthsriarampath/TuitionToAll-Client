import {inject, Injectable} from '@angular/core';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {PaymentDetailedResponse} from '@features/payments/dtos/responses/payment-detailed-response';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MyPaymentFilterRequest} from '@features/payments/dtos/requests/payment-filter-request';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {environment} from '@env/environment.development';
import {MyPaymentReceivesFilterRequest} from '@features/payments/dtos/requests/my-payment-receives-filter-request';
import {
  AssignmentSubmissionFilterRequest
} from '@features/assignment-submission/dtos/requests/assignment-submission-filter-request';
import {
  StudentAssignmentSubmissionFilterRequest
} from '@features/assignment-submission/dtos/requests/student-assignment-submission-filter-request';
import {addFilterParams, buildPaginationParams} from '@shared/utils/helpers/params-helper';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl: string = environment.PAYMENT_API ?? '';

  myPayments(pagination: PaginationRequest, filters?: MyPaymentFilterRequest): Observable<PaginatedApiResponse<PaymentDetailedResponse>> {
    let params = buildPaginationParams(pagination);

    if (filters) {
      params = addFilterParams(params, filters);
    }

    return this.http.get<PaginatedApiResponse<PaymentDetailedResponse>>(`${this.baseUrl}/my`, { params });
  }

  myReceives(pagination: PaginationRequest, filters?: MyPaymentReceivesFilterRequest): Observable<PaginatedApiResponse<PaymentDetailedResponse>> {
    let params = buildPaginationParams(pagination);

    if (filters) {
      params = addFilterParams(params, filters);
    }

    return this.http.get<PaginatedApiResponse<PaymentDetailedResponse>>(`${this.baseUrl}/my/receives`, { params });
  }
}
