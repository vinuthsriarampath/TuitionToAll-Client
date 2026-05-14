import {ModuleStatus} from '../../../enums/ModuleStatus';

export class ModuleResponse {
  id!: number;
  name!: string;
  status!: ModuleStatus;
  batchId!: number;
  createdDate!: string;
  lastModifiedDate!: string;
}
