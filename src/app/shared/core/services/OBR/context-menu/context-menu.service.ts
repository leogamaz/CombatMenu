import { Injectable } from '@angular/core';
import OBR from '@owlbear-rodeo/sdk';
import { PlayerModel } from '../../../models/PlayerModel';

@Injectable({
  providedIn: 'root',
})
export class ContextMenuService {
  ID: string = 'com.tutorial.initiative-tracker';

  constructor() {}

  setupContextMenu() {
    OBR.contextMenu.create({
      id: `${this.ID}/context-menu`,
      icons: [
        {
          icon: '/add.svg',
          label: 'Adicionar Player',
          filter: {
            every: [
              { key: 'layer', value: 'CHARACTER' },
              { key: ['metadata', `${this.ID}/metadata`], value: undefined },
            ],
          },
        },
        {
          icon: '/remove.svg',
          label: 'Remover Jogador',
          filter: {
            every: [{ key: 'layer', value: 'CHARACTER' }],
          },
        },
      ],
      onClick: (context) => {
        const addToInitiative = context.items.every(
          (item) => item.metadata[`${this.ID}/metadata`] === undefined
        );
        if (addToInitiative) {
          OBR.scene.items.updateItems(context.items, (items) => {
            for (let item of items) {
              const player = new PlayerModel(
                item.id,
                item.name,
                30, //Default Value
                20, //Default Value
                40 //Default Value
              );
              item.metadata[`${this.ID}/metadata`] = {
                statusPlayer: player,
              };
            }
          });
        } else {
          OBR.scene.items.updateItems(context.items, (items) => {
            for (let item of items) {
              delete item.metadata[`${this.ID}/metadata`];
            }
          });
        }
      },
    });
  }
}
