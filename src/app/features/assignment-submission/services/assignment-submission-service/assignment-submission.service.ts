import {inject, Injectable} from '@angular/core';
import { AssignmentSubmissionFilterRequest } from "@features/assignment-submission/dtos/requests/assignment-submission-filter-request";
import {HttpClient, HttpParams} from '@angular/common/http';
import {
  StudentAssignmentSubmissionFilterRequest
} from '@features/assignment-submission/dtos/requests/student-assignment-submission-filter-request';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import { StudentAssignmentSubmissionResponse } from "@features/assignment-submission/dtos/responses/student-assignment-submission-response";
import {Observable} from 'rxjs';
import {
  AssignmentSubmissionDetailedResponse
} from '@features/assignment-submission/dtos/responses/assignment-submission-detailed-response';
import {
  AssignmentSubmissionEligibilityResponse
} from '@features/assignment-submission/dtos/responses/assignment-submission-eligibility-response';
import {ApiResponse} from '@shared/utils/response/api-response';
import {environment} from '@env/environment.development';
import {
  AssignmentSubmissionResponse
} from '@features/assignment-submission/dtos/responses/assignment-submission-response';

@Injectable({
  providedIn: 'root'
})
export class AssignmentSubmissionService {

  private readonly http = inject(HttpClient);

  private readonly baseUrl: string = environment.ASSIGNMENT_SUBMISSION_API ?? '';

  submit(assignmentId: number, file: File): Observable<ApiResponse<AssignmentSubmissionResponse>> {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ApiResponse<AssignmentSubmissionResponse>>(`${this.baseUrl}/assignment/${assignmentId}`, formData);
  }

  checkEligibility(assignmentId: number): Observable<ApiResponse<AssignmentSubmissionEligibilityResponse>> {
    return this.http.get<ApiResponse<AssignmentSubmissionEligibilityResponse>>(`${this.baseUrl}/assignment/${assignmentId}/eligibility`);
  }

  getAllSubmissions(assignmentId: number, pagination: PaginationRequest, filters?: AssignmentSubmissionFilterRequest): Observable<PaginatedApiResponse<AssignmentSubmissionDetailedResponse>> {

    let params = this.buildPaginationParams(pagination);

    if (filters) {
      params = this.addFilterParams(params, filters);
    }

    return this.http.get<PaginatedApiResponse<AssignmentSubmissionDetailedResponse>>(`${this.baseUrl}/assignment/${assignmentId}`, { params });
  }

  getMySubmissions(assignmentId: number, pagination: PaginationRequest, filters?: StudentAssignmentSubmissionFilterRequest): Observable<PaginatedApiResponse<StudentAssignmentSubmissionResponse>> {

    let params = this.buildPaginationParams(pagination);

    if (filters) {
      params = this.addFilterParams(params, filters);
    }

    return this.http.get<PaginatedApiResponse<StudentAssignmentSubmissionResponse>>(`${this.baseUrl}/assignment/${assignmentId}/me`, { params });
  }

  private buildPaginationParams(pagination: PaginationRequest): HttpParams {

    let params = new HttpParams()
      .set('page', pagination.page)
      .set('size', pagination.size)
      .set('direction', pagination.direction);

    pagination.sortBy.forEach(sort => {
      params = params.append('sortBy', sort);
    });

    return params;
  }

  private addFilterParams(params: HttpParams, filters: AssignmentSubmissionFilterRequest | StudentAssignmentSubmissionFilterRequest): HttpParams {

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value);
      }
    });

    return params;
  }
}
