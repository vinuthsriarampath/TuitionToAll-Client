import {TeacherBasicResponse} from '../../../teacher/dtos/responses/TeacherBasicResponse';
import {ModuleStatus} from '../../enums/ModuleStatus';
import {BatchBasicResponse} from '@features/batch/dtos/response/BatchBasicResponse';

export class ModuleDetailedResponse {
  id!:number;
  name!:string;
  batch!:BatchBasicResponse;
  teacher!:TeacherBasicResponse;
  status!:ModuleStatus;
  createdDate!:string;
  lastModifiedDate!:string;

}
