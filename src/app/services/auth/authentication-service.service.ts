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
export class AuthenticationServiceService {

  constructor(private http:HttpClient) { }

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
}
