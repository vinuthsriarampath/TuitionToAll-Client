import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { studentRoleGuard } from './student-role.guard';

describe('studentRoleGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => studentRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
