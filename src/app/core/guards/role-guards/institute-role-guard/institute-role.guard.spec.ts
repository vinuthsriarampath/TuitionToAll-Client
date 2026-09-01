import {TestBed} from '@angular/core/testing';
import {CanActivateChildFn} from '@angular/router';

import {instituteRoleGuard} from './institute-role.guard';

describe('instituteRoleGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => instituteRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
