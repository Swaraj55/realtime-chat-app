import { TestBed } from '@angular/core/testing';

import { DiscoverChatService } from './discover-chat.service';

describe('DiscoverChatService', () => {
  let service: DiscoverChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscoverChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
