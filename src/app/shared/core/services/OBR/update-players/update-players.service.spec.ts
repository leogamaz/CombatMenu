import { TestBed } from '@angular/core/testing';

import { UpdatePlayersService } from '../update-players.service';

describe('UpdatePlayersService', () => {
  let service: UpdatePlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatePlayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
