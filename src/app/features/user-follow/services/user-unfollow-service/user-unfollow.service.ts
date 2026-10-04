import { Injectable } from '@angular/core';
import {environment} from '@env/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '@shared/utils/response/api-response';
import {UserUnfollowResponse} from '@features/user-follow/dtos/responses/user-unfollow-response';

@Injectable({
  providedIn: 'root'
})
export class UserUnfollowService {
  private readonly baseUrl: string = environment.USER_UNFOLLOW_API ?? '';

  constructor(private readonly http: HttpClient) {}

  unfollowUser(followingId: number): Observable<ApiResponse<UserUnfollowResponse>> {
    return this.http.delete<ApiResponse<UserUnfollowResponse>>(`${this.baseUrl}/user/${followingId}`);
  }
}
