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
   */
  pullPlayers() {
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

  pushPlayers(players: PlayerModel[]) {
    players.forEach((player) => {
      OBR.scene.items.updateItems([player.id], (itemsPlayer) => {
        itemsPlayer.forEach((item) => {
          item.metadata[this.metadata] = {player}
        });
      });
    });
  }

  getPlayers() {
    OBR.scene.items
      .getItems(['b8d62fff-43e9-4ca1-8766-f69767a9baf8'])
      .then((item) => console.log(item));
  }
}
