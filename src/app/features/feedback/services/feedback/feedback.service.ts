import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment.development';
import {FeedbackCreateRequest} from '@features/feedback/dto/requests/feedback-create-request';
import { Observable } from "rxjs";
import {ApiResponse} from '@shared/utils/response/api-response';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {FeedbackResponse} from '@features/feedback/dto/responses/feedback-response';
import {FeedbackEligibilityResponse} from '@features/feedback/dto/responses/feedback-eligibility-response';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl: string = environment.FEEDBACK_API ?? '';

  submitFeedback(request: FeedbackCreateRequest): Observable<ApiResponse<FeedbackResponse>> {
    return this.http.post<ApiResponse<FeedbackResponse>>(this.baseUrl, request);
  }

  getFeedbacks(courseId: number, pagination: PaginationRequest): Observable<PaginatedApiResponse<FeedbackResponse>> {

    let params = new HttpParams()
      .set('page', pagination.page)
      .set('size', pagination.size)
      .set('direction', pagination.direction);

    pagination.sortBy.forEach((sortBy) => {
      params = params.append('sortBy', sortBy);
    });

    return this.http.get<PaginatedApiResponse<FeedbackResponse>>(`${this.baseUrl}/course/${courseId}`, { params });
  }

  checkFeedbackEligibility(courseId: number): Observable<FeedbackEligibilityResponse> {
    return this.http.get<FeedbackEligibilityResponse>(`${this.baseUrl}/course/${courseId}/eligibility`);
  }
}
