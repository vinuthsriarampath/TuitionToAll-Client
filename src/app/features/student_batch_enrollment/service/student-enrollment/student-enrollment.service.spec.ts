import { TestBed } from '@angular/core/testing';

import { StudentEnrollmentService } from './student-enrollment.service';

describe('StudentEnrollmentService', () => {
  let service: StudentEnrollmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentEnrollmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
