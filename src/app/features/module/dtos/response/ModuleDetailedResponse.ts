import {BatchBasicResponse} from '../../../../core/dto/response-dto/batch/BatchBasicResponse';
import {TeacherBasicResponse} from '../../../../core/dto/response-dto/TeacherBasicResponse';
import {ModuleStatus} from '../../enums/ModuleStatus';

export class ModuleDetailedResponse {
  id!:number;
  name!:string;
  batch!:BatchBasicResponse;
  teacher!:TeacherBasicResponse;
  status!:ModuleStatus;
  createdDate!:string;
  lastModifiedDate!:string;

}
