import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { teacherRoleGuard } from './teacher-role.guard';

describe('teacherRoleGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => teacherRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
