import {TestBed} from '@angular/core/testing';

import {CourseTreeService} from './course-tree.service';

describe('CourseTreeService', () => {
  let service: CourseTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
