import {Student} from '../../models/user-models/sub-user-models/student';
import {Teacher} from '../../models/user-models/sub-user-models/teacher';
import {Institute} from '../../models/user-models/sub-user-models/institute';

export interface SearchResponse{
  students?:Student[];
  teachers?:Teacher[];
  institutes?:Institute[];
}
