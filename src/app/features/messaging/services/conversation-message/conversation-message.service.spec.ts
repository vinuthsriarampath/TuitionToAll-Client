import { TestBed } from '@angular/core/testing';

import { ConversationMessageService } from './conversation-message.service';

describe('ConversationMessageService', () => {
  let service: ConversationMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversationMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
