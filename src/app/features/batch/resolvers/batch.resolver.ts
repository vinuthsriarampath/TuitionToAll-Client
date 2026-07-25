import { ResolveFn } from '@angular/router';
import {inject} from '@angular/core';
import {BatchService} from '@features/batch/services/batch/batch.service';
import {map} from 'rxjs/operators';
import {Batch} from '@features/batch/dtos/response/batch';

export const batchResolver: ResolveFn<Batch> = (route, state) => {
  const batchService = inject(BatchService);
  return batchService.getBatchById(Number(route.paramMap.get('batchId'))).pipe(
    map((res) => res.data as Batch)
  );
};
