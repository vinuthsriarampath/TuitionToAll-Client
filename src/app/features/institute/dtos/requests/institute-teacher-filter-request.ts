import {InstituteTeacherStatus} from '@features/institute/enums/InstituteTeacherStatus';

export class InstituteTeacherFilterRequest{
  name?: string;
  email?:string;
  userSlug?: string;
  status?: InstituteTeacherStatus;
}
