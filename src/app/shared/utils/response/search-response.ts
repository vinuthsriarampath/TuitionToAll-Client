import {User} from '@features/profile/dtos/response/user';

export interface SearchResponse{
  students?:User[];
  teachers?:User[];
  institutes?:User[];
}
