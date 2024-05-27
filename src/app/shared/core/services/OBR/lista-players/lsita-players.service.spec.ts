import { TestBed } from '@angular/core/testing';

import { ListaPlayersService } from './lsita-players.service';

describe('LsitaPlayersService', () => {
  let service: ListaPlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaPlayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
