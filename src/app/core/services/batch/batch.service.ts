import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Batch} from '../../models/batch';
import {environment} from '../../../environment/environment.development';
import {ApiResponse} from '../../dto/response-dto/api-response';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor( private readonly http:HttpClient) { }

  getAllBatchesByCourseId(courseId:number):Observable<ApiResponse<Batch[]>>{
    return this.http.get<ApiResponse<Batch[]>>(`${environment.BATCH_API}/${courseId}/all`)
  }
}
