import {inject, Injectable} from '@angular/core';
import {PostCreateRequest} from '@features/posts/dtos/requests/post-create-request';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment.development';
import {Observable} from 'rxjs';
import {ApiResponse} from '@shared/utils/response/api-response';
import {PostResponse} from '@features/posts/dtos/responses/post-response';

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
}
