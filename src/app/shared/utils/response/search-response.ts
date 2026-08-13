import {User} from '@features/user/dtos/responses/user';

export interface SearchResponse{
  students?:User[];
  teachers?:User[];
  institutes?:User[];
}
