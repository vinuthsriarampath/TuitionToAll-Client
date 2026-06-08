import {ScheduleLectureCreateStatus} from './enums/ScheduleLectureStatus';

export class ScheduleLectureCreateRequest {
  chapterId!: number;
  topic!: string;
  startDate!: string;
  startTime!: string;
  endTime!: string;
  lateAttendance!: boolean;
  meetingUrl!: string;
  status!: ScheduleLectureCreateStatus;
}
