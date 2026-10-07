import {inject, Injectable} from '@angular/core';
import {PostCreateRequest} from '@features/posts/dtos/requests/post-create-request';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment.development';
import {Observable} from 'rxjs';
import {ApiResponse} from '@shared/utils/response/api-response';
import {PostResponse} from '@features/posts/dtos/responses/post-response';
import {UserPostResponse} from '@features/posts/dtos/responses/user-post-response';
import {PaginationRequest} from '@shared/utils/requests/PaginationRequest';
import {MyPostsFilterRequests} from '@features/posts/dtos/requests/my-posts-filter-request';
import {PaginatedApiResponse} from '@shared/utils/response/paginated-api-response';
import {addFilterParams, buildPaginationParams} from '@shared/utils/helpers/params-helper';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly http = inject(HttpClient);

  private readonly baseUrl: string = environment.POST_API ?? '';

  createPost(request: PostCreateRequest, files?: File[]): Observable<ApiResponse<PostResponse>> {

    const formData = new FormData();

    formData.append('request',
      new Blob(
        [JSON.stringify(request)],
        { type: 'application/json' }
      )
    );

    if (files && files.length > 0) {
      files.forEach(file => {
        formData.append('files', file);
      });
    }

    return this.http.post<ApiResponse<PostResponse>>(`${this.baseUrl}`, formData);
  }

  publishDraftPost(postId: number): Observable<ApiResponse<PostResponse>> {
    return this.http.patch<ApiResponse<PostResponse>>(`${this.baseUrl}/${postId}/publish`, {});
  }

  getMyPosts(pagination: PaginationRequest, filters?: MyPostsFilterRequests): Observable<PaginatedApiResponse<UserPostResponse>> {

    let params = buildPaginationParams(pagination);

    if (filters) {
      params = addFilterParams(params, filters);
    }

    return this.http.get<PaginatedApiResponse<UserPostResponse>>(`${this.baseUrl}/me`, { params });
  }

  getUserPosts(targetUserId: number, pagination: PaginationRequest): Observable<PaginatedApiResponse<UserPostResponse>> {

    const params = buildPaginationParams(pagination);

    return this.http.get<PaginatedApiResponse<UserPostResponse>>(`${this.baseUrl}/user/${targetUserId}`, { params });
  }
}
