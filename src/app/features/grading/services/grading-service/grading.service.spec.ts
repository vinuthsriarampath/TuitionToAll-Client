import { TestBed } from '@angular/core/testing';

import { GradingService } from './grading.service';

describe('GradingService', () => {
  let service: GradingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
