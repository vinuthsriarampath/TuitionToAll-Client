import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment.development';
import {ScheduleLectureCreateRequest} from '../../dtos/request/ScheduleLectureCreateRequest';
import {Observable} from 'rxjs';
import {ScheduleLectureResponse} from '../../dtos/response/ScheduleLectureResponse';
import {ApiResponse} from "@shared/utils/response/api-response";
import {ScheduleLectureUpdateRequest} from '../../dtos/request/ScheduleLectureUpdateRequest';
import {ScheduleLectureStatus} from '@features/schedule-lectures/enums/ScheduleLectureStatus';
import {getDate, getTime} from '@shared/utils/helpers/date-helper';

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

  canJoinLecture(scheduleLecture: ScheduleLectureResponse): boolean {

    const currentDate = getDate(0, 0);
    const currentTime = getTime(0, 0);

    const isToday:boolean = scheduleLecture.startDate === currentDate;

    const hasStarted:boolean = currentTime >= scheduleLecture.startTime;

    const notEnded:boolean = currentTime <= scheduleLecture.endTime;

    const validStatus:boolean = scheduleLecture.status === ScheduleLectureStatus.SCHEDULED || scheduleLecture.status === ScheduleLectureStatus.LIVE;

    let validAttendance:boolean;

    if (scheduleLecture.lateAttendance) {
      validAttendance = true;
    } else {
      const startDateTime = new Date(`${scheduleLecture.startDate}T${scheduleLecture.startTime}`);
      startDateTime.setMinutes(startDateTime.getMinutes() + 10);
      const now = new Date();
      validAttendance = now <= startDateTime;
    }
    return (isToday && hasStarted && notEnded && validStatus && validAttendance);
  }
}
