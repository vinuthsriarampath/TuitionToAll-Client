import { TestBed } from '@angular/core/testing';

import { GlobalNotificationService } from './global-notification.service';

describe('GlobalNotificationService', () => {
  let service: GlobalNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
