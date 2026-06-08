import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment.development';
import {ScheduleLectureCreateRequest} from '../../dtos/request/ScheduleLectureCreateRequest';
import {Observable} from 'rxjs';
import {ScheduleLectureResponse} from '../../dtos/response/ScheduleLectureResponse';
import {ApiResponse} from "../../../../shared/utils/response/api-response";
import {ScheduleLectureUpdateRequest} from '../../dtos/request/ScheduleLectureUpdateRequest';

@Injectable({
  providedIn: 'root'
})
export class ScheduleLectureService {

  private readonly baseUrl: string = environment.SCHEDULE_LECTURE_API ?? '';

  private readonly http: HttpClient = inject(HttpClient);

  scheduleLecture(request: ScheduleLectureCreateRequest): Observable<ApiResponse<ScheduleLectureResponse>> {
    return this.http.post<ApiResponse<ScheduleLectureResponse>>(`${this.baseUrl}`, request);
  }

  updateScheduleLecture(scheduleLectureId: number, request: ScheduleLectureUpdateRequest): Observable<ApiResponse<ScheduleLectureResponse>> {
    return this.http.put<ApiResponse<ScheduleLectureResponse>>(`${this.baseUrl}/${scheduleLectureId}`, request);
  }
}
