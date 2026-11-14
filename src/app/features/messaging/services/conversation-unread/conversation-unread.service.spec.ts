import { TestBed } from '@angular/core/testing';

import { ConversationUnreadService } from './conversation-unread.service';

describe('ConversationUnreadService', () => {
  let service: ConversationUnreadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversationUnreadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
