import { Injectable } from '@angular/core';
import OBR, { Metadata } from '@owlbear-rodeo/sdk';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor() {}

  async getRole(): Promise<'GM' | 'PLAYER'> {
    return await OBR.player.getRole();
  }
}
