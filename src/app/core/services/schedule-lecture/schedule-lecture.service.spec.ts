import { TestBed } from '@angular/core/testing';

import { ScheduleLectureService } from './schedule-lecture.service';

describe('ScheduleLectureService', () => {
  let service: ScheduleLectureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleLectureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
