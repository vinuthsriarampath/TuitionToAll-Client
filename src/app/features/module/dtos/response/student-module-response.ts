import {ModuleStatus} from '@features/module/enums/ModuleStatus';

export class StudentModuleResponse {
  id!: number;
  name!: string;
  status!: ModuleStatus;
  batchId!: number;
}
