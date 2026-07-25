import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { assignmentResolver } from './assignment.resolver';

describe('assignmentResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => assignmentResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
