import {inject, Injectable} from '@angular/core';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {PaymentDetailedResponse} from '@features/payments/dtos/responses/payment-detailed-response';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MyPaymentFilterRequest} from '@features/payments/dtos/requests/payment-filter-request';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {environment} from '@env/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl: string = environment.PAYMENT_API ?? '';

  myPayments(pagination: PaginationRequest, filters?: MyPaymentFilterRequest): Observable<PaginatedApiResponse<PaymentDetailedResponse>> {
    let params = new HttpParams()
      .set('page', pagination.page)
      .set('size', pagination.size)
      .set('direction', pagination.direction);

    pagination.sortBy.forEach(sort => {
      params = params.append('sortBy', sort);
    });

    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = (filters as any)[key];
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<PaginatedApiResponse<PaymentDetailedResponse>>(`${this.baseUrl}/my`, { params });
  }
}
