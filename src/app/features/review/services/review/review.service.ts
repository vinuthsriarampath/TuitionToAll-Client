import {inject, Injectable} from '@angular/core';
import {environment} from '@env/environment.development';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ReviewCreateRequest} from '@features/review/dtos/request/review-create-request';
import {Observable} from 'rxjs';
import {ApiResponse} from '@shared/utils/response/api-response';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {BasicReviewResponse} from '@features/review/dtos/response/basic-review-response';
import {ReviewEligibilityResponse} from '@features/review/dtos/response/review-eligibility-response';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl: string = environment.REVIEW_API ?? '';

  createReview(request: ReviewCreateRequest): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(this.baseUrl, request);
  }

  getReviewsByCourseId(courseId: number, pagination: PaginationRequest): Observable<PaginatedApiResponse<BasicReviewResponse>> {
    const { page, size, direction, sortBy } = pagination;

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('direction', direction);

    sortBy.forEach(value => {
      params = params.append('sortBy', value);
    });

    return this.http.get<PaginatedApiResponse<BasicReviewResponse>>(`${this.baseUrl}/course/${courseId}`, { params });
  }

  checkReviewEligibility(courseId: number): Observable<ReviewEligibilityResponse> {
    return this.http.get<ReviewEligibilityResponse>(`${this.baseUrl}/course/${courseId}/eligibility`);
  }
}
