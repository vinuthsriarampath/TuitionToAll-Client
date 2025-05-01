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

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http:HttpClient) {
  }

  findUserByUserSlug(userSlug: string){
    return this.http.get<ApiResponse>(`${environment.USER_API}/by-user-slug/${userSlug}`);
  }
}
