/*
 * Copyright (c) 2025 vinuth sri arampath
 *
 * This code is the intellectual property of vinuth sri arampath and is protected under copyright law.
 * Unauthorized copying, modification, distribution, or use of this code, in whole or in part,
 * without prior written permission is strictly prohibited.
 *
 * Portions of this code may be generated with AI and modified by vinuth sri arampath
 * All rights reserved.
 */

import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '@shared/utils/response/api-response';
import {environment} from '@env/environment.development';
import {User} from '../../dtos/responses/user';
import {BehaviorSubject, Observable} from 'rxjs';
import { PaginationRequest } from "@shared/utils/requests/PaginationRequest";
import { UserBasicFilterRequest } from "@features/user/dtos/requests/user-basic-filter-requests";
import { PaginatedApiResponse } from "@shared/utils/response/paginated-api-response";
import {addFilterParams, buildPaginationParams} from '@shared/utils/helpers/params-helper';
import { UserBasicResponse } from "@features/user/dtos/responses/user-basic-response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly currentUserSubject:BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private readonly http = inject(HttpClient);

  private readonly baseUrl: string = environment.USER_API ?? '';

  findUserByUserSlug(userSlug: string){
    return this.http.get<ApiResponse<User>>(`${this.baseUrl}/by-user-slug/${userSlug}`);
  }

  setCurrentUser(user: User|null){
    this.currentUserSubject.next(user);
  }

  getCurrentUserRole(): string {
    const user = this.currentUserSubject.value;
    if(user){
        return user?.role?.role || 'N/A';
    }
    return 'N/A';
  }

  getCurrentUser(): User {
    const user = this.currentUserSubject.value;
    if(user){
      return user;
    }
    throw new Error('Current user not found');
  }

  getMyFollowers(pagination: PaginationRequest, filters?: UserBasicFilterRequest): Observable<PaginatedApiResponse<UserBasicResponse>> {

    let params = buildPaginationParams(pagination);

    if (filters) {
      params = addFilterParams(params, filters);
    }

    return this.http.get<PaginatedApiResponse<UserBasicResponse>>(`${this.baseUrl}/me/followers`, { params });
  }

  getMyFollowings(pagination: PaginationRequest, filters?: UserBasicFilterRequest): Observable<PaginatedApiResponse<UserBasicResponse>> {

    let params = buildPaginationParams(pagination);

    if (filters) {
      params = addFilterParams(params, filters);
    }

    return this.http.get<PaginatedApiResponse<UserBasicResponse>>(`${this.baseUrl}/me/followings`, { params });
  }
}
