import { TestBed } from '@angular/core/testing';

import { InstituteDashboardStoreService } from './institute-dashboard-store.service';

describe('InstituteDashboardStoreService', () => {
  let service: InstituteDashboardStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituteDashboardStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
