import {TestBed} from '@angular/core/testing';
import {ResolveFn} from '@angular/router';

import {batchResolver} from './batch.resolver';
import {Batch} from '@features/batch/dtos/response/batch';

describe('batchResolver', () => {
  const executeResolver: ResolveFn<Batch> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => batchResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
