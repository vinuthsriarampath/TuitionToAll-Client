import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../dto/response-dto/api-response';
import {environment} from '../../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileFileServiceService {

  constructor(private readonly http:HttpClient) { }

  uploadFile(type:string,file:File){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ApiResponse>(`${environment.USER_PROFILE_API}/upload/${type}`, formData);
  }

}
