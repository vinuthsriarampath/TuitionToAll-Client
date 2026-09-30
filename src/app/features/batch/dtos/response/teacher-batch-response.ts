import {TeacherModuleResponse} from '@features/module/dtos/response/teacher-module-response';
import {BatchStatus} from '@features/batch/enums/batch-status';

export class TeacherBatchResponse {
  batchId!: number;
  batchName!: string;
  batchStartDate!: string;
  batchStartTime!: string;
  batchStatus!: BatchStatus;
  modules!: TeacherModuleResponse[];
}
