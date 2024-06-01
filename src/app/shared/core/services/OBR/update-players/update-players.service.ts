import { Injectable } from '@angular/core';
import OBR from '@owlbear-rodeo/sdk';
import { PlayerModel } from '../../../models/PlayerModel';

@Injectable({
  providedIn: 'root',
})
export class UpdatePlayersService {
  ID: string = 'com.tutorial.initiative-tracker';
  constructor() {}

  async GetPlayers() {
    let players = await OBR.scene.items.getItems(
      (item) =>
        item.layer === 'CHARACTER' &&
        item.metadata[`${this.ID}/metadata`] !== undefined
    );
  }

  async UpdatePlayers(player: PlayerModel) {
    OBR.scene.items.updateItems(
      (items) => items.id === player.id,
      (item) => {
        item[0].metadata[`${this.ID}/metadata`].statusPlayer = player;
      }
    );
  }
}
