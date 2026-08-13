import {Institute} from '../../../institute/dtos/response/institute';
import {Teacher} from './teacher';
import {Student} from '../../../student/dtos/responses/student';

export type RoleDetails = Student | Teacher | Institute;
