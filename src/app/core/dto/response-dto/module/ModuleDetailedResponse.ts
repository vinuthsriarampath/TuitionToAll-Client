import {BatchBasicResponse} from '../batch/BatchBasicResponse';
import {TeacherBasicResponse} from '../TeacherBasicResponse';
import {ModuleStatus} from '../../../enums/ModuleStatus';

export class ModuleDetailedResponse {
  id!:number;
  name!:string;
  batch!:BatchBasicResponse;
  teacher!:TeacherBasicResponse;
  status!:ModuleStatus;
  createdDate!:string;
  lastModifiedDate!:string;

}
