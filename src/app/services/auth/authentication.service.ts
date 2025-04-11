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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginRequest } from '../../requestDtos/user-login-request';
import { environment } from '../../environment/environment.development';
import { AuthResponse } from '../../responseDtos/auth-response';
import { StudentRegistrationRequest } from '../../requestDtos/registration/student-registration-request';
import { TeacherRegistrationRequest } from '../../requestDtos/registration/teacher-registration-request';
import { InstituteRegistrationRequest } from '../../requestDtos/registration/institute-registration-request';
import { ApiResponse } from '../../responseDtos/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private readonly http:HttpClient) { }

  login(UserLoginRequest:UserLoginRequest){

    return this.http.post<AuthResponse>(`${environment.AUTH_API}/login`, UserLoginRequest)
  }

  registerStudent(StudentRegistrationRequest:StudentRegistrationRequest){
    return this.http.post<ApiResponse>(`${environment.AUTH_API}/register/student`, StudentRegistrationRequest);
  }

  registerTeacher(TeacherRegistrationRequest:TeacherRegistrationRequest){
    return this.http.post<ApiResponse>(`${environment.AUTH_API}/register/teacher`, TeacherRegistrationRequest);
  }

  registerInstitute(InstituteRegistrationRequest:InstituteRegistrationRequest){
    return this.http.post<ApiResponse>(`${environment.AUTH_API}/register/institute`, InstituteRegistrationRequest);
  }

  verifyToken(){
    return this.http.get<ApiResponse>(`${environment.USER_API}/me`);
  }

  getAuthToken(){
    console.log(localStorage.getItem('token'))
    return localStorage.getItem('token')
  }
}
