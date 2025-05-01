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

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../dto/response-dto/api-response';
import {environment} from '../../../environment/environment.development';
import {
  InstituteDetailsUpdateRequest
} from '../../dto/request-dto/update-user-dto/sub-user-details-update-dto/InstituteDetailsUpdateRequest';
import {
  StudentDetailsUpdateRequest
} from '../../dto/request-dto/update-user-dto/sub-user-details-update-dto/StudentDetailsUpdateRequest';
import {
  TeacherDetailsUpdateRequest
} from '../../dto/request-dto/update-user-dto/sub-user-details-update-dto/TeacherDetailsUpdateRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http:HttpClient) {
  }

  findUserByUserSlug(userSlug: string){
    return this.http.get<ApiResponse>(`${environment.USER_API}/by-user-slug/${userSlug}`);
  }

  updateInstituteDetails(updateRequest: InstituteDetailsUpdateRequest){
    return this.http.patch(`${environment.USER_API}/institutes/update/me`,updateRequest);
  }

  updateTeacherDetails(updateRequest: TeacherDetailsUpdateRequest){
    return this.http.patch(`${environment.USER_API}/teachers/update/me`,updateRequest);
  }

  updateStudentDetails(updateRequest: StudentDetailsUpdateRequest){
    return this.http.patch(`${environment.USER_API}/student/update/me`,updateRequest);
  }
}
