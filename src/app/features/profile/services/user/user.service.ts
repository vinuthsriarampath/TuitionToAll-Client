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
} from '../../dtos/request/user-update/sub-user-details-update-dto/InstituteDetailsUpdateRequest';
import {
  StudentDetailsUpdateRequest
} from '../../dtos/request/user-update/sub-user-details-update-dto/StudentDetailsUpdateRequest';
import {
  TeacherDetailsUpdateRequest
} from '../../dtos/request/user-update/sub-user-details-update-dto/TeacherDetailsUpdateRequest';
import {User} from '../../dtos/response/user';
import {BehaviorSubject} from 'rxjs';
import {Institute} from '../../dtos/response/institute';
import {Teacher} from '../../dtos/response/teacher';
import {Student} from '../../dtos/response/student';

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

  updateInstituteDetails(updateRequest: InstituteDetailsUpdateRequest){
    return this.http.patch<ApiResponse<Institute>>(`${environment.USER_API}/institutes/update/me`,updateRequest);
  }

  updateTeacherDetails(updateRequest: TeacherDetailsUpdateRequest){
    return this.http.patch<ApiResponse<Teacher>>(`${environment.USER_API}/teachers/update/me`,updateRequest);
  }

  updateStudentDetails(updateRequest: StudentDetailsUpdateRequest){
    return this.http.patch<ApiResponse<Student>>(`${environment.USER_API}/student/update/me`,updateRequest);
  }

  setCurrentUser(user: User|null){
    this.currentUserSubject.next(user);
  }
}
