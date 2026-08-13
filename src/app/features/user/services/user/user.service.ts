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
import {
  InstituteDetailsUpdateRequest
} from '../../../institute/dtos/requests/InstituteDetailsUpdateRequest';
import {
  StudentDetailsUpdateRequest
} from '../../../student/dtos/requests/StudentDetailsUpdateRequest';
import {
  TeacherDetailsUpdateRequest
} from '../../../teacher/dtos/requests/TeacherDetailsUpdateRequest';
import {User} from '../../../profile/dtos/response/user';
import {BehaviorSubject} from 'rxjs';
import {Institute} from '../../../institute/dtos/response/institute';
import {Teacher} from '../../../teacher/dtos/responses/teacher';
import {Student} from '../../../student/dtos/responses/student';

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
}
