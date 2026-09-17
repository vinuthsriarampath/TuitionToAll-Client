import { TestBed } from '@angular/core/testing';

import { AssignmentSubmissionService } from './assignment-submission.service';

describe('AssignmentSubmissionService', () => {
  let service: AssignmentSubmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentSubmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
