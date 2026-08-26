import {TestBed} from '@angular/core/testing';

import {ChapterAssignmentService} from './chapter-assignment.service';

describe('ChapterAssignmentService', () => {
  let service: ChapterAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChapterAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
