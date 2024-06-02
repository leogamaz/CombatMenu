import { TestBed } from '@angular/core/testing';

import { SyncPlayersService } from './sync-players.service';

describe('SyncPlayersService', () => {
  let service: SyncPlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyncPlayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
