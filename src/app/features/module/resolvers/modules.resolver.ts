import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {ModuleService} from '@features/module/services/module/module.service';
import {map} from 'rxjs/operators';
import {ModuleResponse} from '@features/module/dtos/response/ModuleResponse';

export const modulesResolver: ResolveFn<ModuleResponse> = (route, state) => {
  const moduleService = inject(ModuleService)
  return moduleService.getModuleById(Number(route.paramMap.get('moduleId'))).pipe(
    map((res) => res.data as ModuleResponse)
  );
};
