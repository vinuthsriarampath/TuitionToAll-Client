import {ScheduleLectureStatus} from '../../enums/ScheduleLectureStatus';

export class ScheduleLectureUpdateRequest {
  topic!: string;
  startDate!: string;
  startTime!: string;
  endTime!: string;
  lateAttendance!: boolean;
  meetingUrl!: string;
  status!: ScheduleLectureStatus;
}
