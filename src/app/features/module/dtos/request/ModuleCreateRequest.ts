import {ModuleCreateStatus} from './enums/ModuleCreateStatus';

export class ModuleCreateRequest {
  name!: string;
  status!: ModuleCreateStatus;
  batchId!: number;
  teacherId!: number;
}
