import {User} from '../../models/user-models/user';

export interface SearchResponse{
  students?:User[];
  teachers?:User[];
  institutes?:User[];
}
