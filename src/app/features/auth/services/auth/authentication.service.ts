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
import {inject, Injectable} from '@angular/core';
import {UserLoginRequest} from '../../dtos/request/user-login-request';
import {environment} from '@env/environment.development';
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
import {ApiResponse} from '@shared/utils/response/api-response';
import {User} from '../../../user/dtos/responses/user';
import {Institute} from '../../../institute/dtos/response/institute';
import {Teacher} from '../../../teacher/dtos/responses/teacher';
import {Student} from '../../../student/dtos/responses/student';
import {StompClientService} from '@core/services/stomp/stomp-client.service';
import {UserService} from '@features/user/services/user/user.service';
import {Observable, of, tap} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private readonly http:HttpClient) { }
  private readonly http: HttpClient = inject(HttpClient);
  private readonly stompClient: StompClientService = inject(StompClientService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  login(UserLoginRequest:UserLoginRequest){

    return this.http.post<AuthResponse>(`${environment.AUTH_API}/login`, UserLoginRequest)
    return this.http.post<AuthResponse>(`${environment.AUTH_API}/login`, UserLoginRequest).pipe(tap(response => {
      this.setAuthToken(response.token);
      if(response.user){
        this.userService.setCurrentUser(response.user);
      }
      if(!this.stompClient.connected()){
        this.stompClient.connect();
      }
    }))
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

  setAuthToken(token: string){
    localStorage.setItem('token', token as string);
  }

  getAuthToken(){
    return localStorage.getItem('token')
  }

  removeAuthToken(){
    localStorage.removeItem('token');
  }

  validateInstitute(){
    return this.http.get<ApiResponse<null>>(` ${environment.INSTITUTE_API}/validate/role`);
  }

  logout() {
    const token: string|null = this.getAuthToken();

    if(token){
      this.removeAuthToken();
      if (this.stompClient.connected()) {
        this.stompClient.disconnect();
      }
      this.router.navigate(['/auth/login']);
    }
  }
}
