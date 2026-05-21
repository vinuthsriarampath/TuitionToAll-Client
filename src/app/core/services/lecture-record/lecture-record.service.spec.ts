import { TestBed } from '@angular/core/testing';

import { LectureRecordService } from './lecture-record.service';

describe('LectureRecordService', () => {
  let service: LectureRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LectureRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
