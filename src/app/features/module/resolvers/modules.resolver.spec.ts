import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { modulesResolver } from './modules.resolver';

describe('modulesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => modulesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
