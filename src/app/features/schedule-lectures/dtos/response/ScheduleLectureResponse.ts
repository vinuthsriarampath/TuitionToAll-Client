import {ScheduleLectureStatus} from '../../enums/ScheduleLectureStatus';

export class ScheduleLectureResponse {
  id!: number;
  chapterId!: number;
  topic!: string;
  startDate!: string;
  startTime!: string;
  endTime!: string;
  lateAttendance!: boolean;
  meetingUrl!: string;
  status!: ScheduleLectureStatus;
  createdDate!: string;
  lastModifiedDate!: string;
}
