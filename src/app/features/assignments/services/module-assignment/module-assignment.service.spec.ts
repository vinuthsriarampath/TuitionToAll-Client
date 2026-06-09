import { TestBed } from '@angular/core/testing';

import { ModuleAssignmentService } from './module-assignment.service';

describe('ModuleAssignmentService', () => {
  let service: ModuleAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
