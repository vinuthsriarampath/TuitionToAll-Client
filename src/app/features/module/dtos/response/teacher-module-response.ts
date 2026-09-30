import { ModuleStatus } from "@features/module/enums/ModuleStatus";

export class TeacherModuleResponse {
  moduleId!: number;
  moduleName!: string;
  moduleStatus!: ModuleStatus;
  moduleCreatedDate!: string;
  moduleLastModifiedDate!: string;
}
