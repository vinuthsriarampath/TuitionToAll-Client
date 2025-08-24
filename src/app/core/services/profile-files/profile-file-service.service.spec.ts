import { TestBed } from '@angular/core/testing';

import { ProfileFileServiceService } from './profile-file-service.service';

describe('ProfileFileServiceService', () => {
  let service: ProfileFileServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileFileServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
