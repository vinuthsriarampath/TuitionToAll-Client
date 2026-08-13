import {Institute} from '../../../institute/dtos/response/institute';
import {Teacher} from './teacher';
import {Student} from './student';

export type RoleDetails = Student | Teacher | Institute;
