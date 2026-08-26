import {TestBed} from '@angular/core/testing';

import {InstituteTeacherService} from './institute-teacher.service';

describe('InstituteTeacherService', () => {
  let service: InstituteTeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituteTeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
