import {inject, Injectable} from '@angular/core';
import { SubmissionGradedResponse } from "@features/grading/dtos/responses/submission-graded-response";
import {ApiResponse} from '@shared/utils/response/api-response';
import {Observable} from 'rxjs';
import {GradingSubmissionRequest} from '@features/grading/dtos/requests/grading-submission-request';
import {environment} from '@env/environment.development';
import {HttpClient} from '@angular/common/http';
import {GradingEligibilityResponse} from '@features/grading/dtos/responses/grading-eligibility-response';

@Injectable({
  providedIn: 'root'
})
export class GradingService {

  private readonly http = inject(HttpClient);

  private readonly baseUrl: string = environment.GRADING_API ?? '';

  gradeSubmission(submissionId: number, request: GradingSubmissionRequest): Observable<ApiResponse<SubmissionGradedResponse>> {
    return this.http.post<ApiResponse<SubmissionGradedResponse>>(`${this.baseUrl}/submissions/${submissionId}`, request);
  }

  checkGradingEligibility(submissionId: number): Observable<ApiResponse<GradingEligibilityResponse>> {
    return this.http.get<ApiResponse<GradingEligibilityResponse>>(`${this.baseUrl}/submissions/${submissionId}/eligibility`);
  }
}
