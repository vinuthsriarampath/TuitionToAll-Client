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

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserLoginRequest} from '../../dtos/request/user-login-request';
import {environment} from '../../../../../environments/environment.development';
import {AuthResponse} from '../../dtos/responses/auth-response';
import {
  StudentRegistrationRequest
} from '../../dtos/request/registration/sub-registration-dto/student-registration-request';
import {
  TeacherRegistrationRequest
} from '../../dtos/request/registration/sub-registration-dto/teacher-registration-request';
import {
  InstituteRegistrationRequest
} from '../../dtos/request/registration/sub-registration-dto/institute-registration-request';
import {ApiResponse} from '../../../../shared/utils/response/api-response';
import {User} from '../../../profile/dtos/response/user';
import {Institute} from '../../../profile/dtos/response/institute';
import {Teacher} from '../../../profile/dtos/response/teacher';
import {Student} from '../../../profile/dtos/response/student';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private readonly http:HttpClient) { }

  login(UserLoginRequest:UserLoginRequest){

    return this.http.post<AuthResponse>(`${environment.AUTH_API}/login`, UserLoginRequest)
  }

  registerStudent(StudentRegistrationRequest:StudentRegistrationRequest){
    return this.http.post<ApiResponse<Student>>(`${environment.AUTH_API}/register/student`, StudentRegistrationRequest);
  }

  registerTeacher(TeacherRegistrationRequest:TeacherRegistrationRequest){
    return this.http.post<ApiResponse<Teacher>>(`${environment.AUTH_API}/register/teacher`, TeacherRegistrationRequest);
  }

  registerInstitute(InstituteRegistrationRequest:InstituteRegistrationRequest){
    return this.http.post<ApiResponse<Institute>>(`${environment.AUTH_API}/register/institute`, InstituteRegistrationRequest);
  }

  verifyToken(){
    return this.http.get<ApiResponse<User>>(`${environment.USER_API}/me`);
  }

  resetPasswordRequest(email:string){
    return this.http.post<ApiResponse<null>>(`${environment.AUTH_API}/forgot-password/request`, email);
  }

  PasswordReset(token:string, newPassword:string){
    return this.http.post<ApiResponse<null>>(`${environment.AUTH_API}/forgot-password/reset?token=${token}`, newPassword);
  }

  getAuthToken(){
    return localStorage.getItem('token')
  }

  validateInstitute(){
    return this.http.get<ApiResponse<null>>(` ${environment.USER_API}/validate/institute-role`);
  }
}
