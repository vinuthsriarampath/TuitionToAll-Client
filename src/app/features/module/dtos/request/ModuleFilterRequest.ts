import {ModuleStatus} from '@features/module/enums/ModuleStatus';

export class ModuleFilterRequest {
  name?:string;
  status?:ModuleStatus;
}
