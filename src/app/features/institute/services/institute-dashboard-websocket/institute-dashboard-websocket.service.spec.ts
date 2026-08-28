import { TestBed } from '@angular/core/testing';

import { InstituteDashboardWebsocketService } from './institute-dashboard-websocket.service';

describe('InstituteDashboardWebsocketService', () => {
  let service: InstituteDashboardWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituteDashboardWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
