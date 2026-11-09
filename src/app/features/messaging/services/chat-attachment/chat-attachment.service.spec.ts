import { TestBed } from '@angular/core/testing';

import { ChatAttachmentService } from './chat-attachment.service';

describe('ChatAttachmentService', () => {
  let service: ChatAttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatAttachmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
