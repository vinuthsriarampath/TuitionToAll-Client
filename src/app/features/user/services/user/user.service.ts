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

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '@shared/utils/response/api-response';
import {environment} from '@env/environment.development';
import {User} from '../../dtos/responses/user';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly currentUserSubject:BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private readonly http:HttpClient) {}

  findUserByUserSlug(userSlug: string){
    return this.http.get<ApiResponse<User>>(`${environment.USER_API}/by-user-slug/${userSlug}`);
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
}
