import { Injectable } from '@angular/core';
import OBR from '@owlbear-rodeo/sdk';
import { PlayerModel } from '../../../models/playerModel';

@Injectable({
  providedIn: 'root',
})
export class SyncPlayersService {
  title = 'status-character';
  metadata = 'com.simple.combat.menu/metadata';
  contextMenu = 'com.simple.combat.menu/contextMenu';
  id = 'com.simple.combat.menu';

  constructor() {}

  /**
   * Synchronizes the players' data by listening to changes in the scene items.
   * @param element The element to which the players' data is synced (if necessary).
   * @returns Promise<PlayerModel[]> A promise that resolves to an array of PlayerModel instances.
   */
  async syncPlayers(): Promise<PlayerModel[]> {
    return new Promise((resolve) => {
      const playersList = (players: Array<any>) => {
        let playerItems: PlayerModel[] = [];
        players.forEach((player: any) => {
          const metadata = player.metadata[this.metadata];
          if (metadata) {
            playerItems.push(metadata.player);
          }
        });
        resolve(playerItems);
      };

      OBR.scene.items.onChange(playersList);
    });
  }
}
