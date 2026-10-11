import { TestBed } from '@angular/core/testing';

import { UserUnfollowService } from './user-unfollow.service';

describe('UserUnfollowService', () => {
  let service: UserUnfollowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserUnfollowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
