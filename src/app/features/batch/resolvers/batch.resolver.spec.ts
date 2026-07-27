import {TestBed} from '@angular/core/testing';
import {ResolveFn} from '@angular/router';

import {batchResolver} from './batch.resolver';

describe('batchResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => batchResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
