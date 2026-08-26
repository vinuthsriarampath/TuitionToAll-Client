import { TestBed } from '@angular/core/testing';

import { StompClientService } from './stomp-client.service';

describe('StompClientService', () => {
  let service: StompClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StompClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
