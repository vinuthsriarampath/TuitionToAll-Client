import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginRequest } from '../../requestDtos/user-login-request';
import { environment } from '../../environment/environment.development';
import { AuthResponse } from '../../responseDtos/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private http:HttpClient) { }

  login(UserLoginRequest:UserLoginRequest){
    
    return this.http.post<AuthResponse>(`${environment.AUTH_API}/login`, UserLoginRequest)
  }
}
