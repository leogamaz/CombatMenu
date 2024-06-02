import { Injectable, EventEmitter } from '@angular/core';
import OBR from '@owlbear-rodeo/sdk';
import { PlayerModel } from '../../../models/playerModel';

@Injectable({
  providedIn: 'root',
})
export class SyncPlayersService {
  title = 'status-personagem';
  metadata = 'com.simple.combat.menu/metadata';
  contextMenu = 'com.simple.combat.menu/contextMenu';
  id = 'com.simple.combat.menu';
  playersListUpdated: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor() {}

  /**
   * Sincroniza os dados dos jogadores ouvindo as mudanças nos itens da cena.
   * @param element O elemento ao qual os dados dos jogadores são sincronizados (se necessário).
   * @returns Promise<PlayerModel[]> Uma promessa que resolve para um array de instâncias de PlayerModel.
   */
  syncPlayers() {
    const playersList = (players: Array<any>) => {
      let playerItems: PlayerModel[] = [];
      players.forEach((player: any) => {
        const metadata = player.metadata[this.metadata];
        if (metadata) {
          playerItems.push(metadata.player);
        }
      });
      this.playersListUpdated.emit(playerItems);
    };
    OBR.scene.items.onChange(playersList);
  }
}
