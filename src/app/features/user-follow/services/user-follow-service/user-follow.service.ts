import { Injectable } from '@angular/core';
import {environment} from '@env/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '@shared/utils/response/api-response';
import {UserFollowResponse} from '@features/user-follow/dtos/responses/user-follow-response';

@Injectable({
  providedIn: 'root'
})
export class UserFollowService {
  private readonly baseUrl: string = environment.USER_FOLLOW_API ?? '';

  constructor(private readonly http: HttpClient) {}

  followUser(followingId: number): Observable<ApiResponse<UserFollowResponse>> {
    return this.http.post<ApiResponse<UserFollowResponse>>(`${this.baseUrl}/user/${followingId}`, {});
  }
}
