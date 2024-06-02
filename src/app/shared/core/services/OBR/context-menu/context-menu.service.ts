import { Injectable } from '@angular/core';
import OBR from '@owlbear-rodeo/sdk';
import { PlayerModel } from '../../../models/playerModel';

@Injectable({
  providedIn: 'root',
})
export class ContextMenuService {
  title = 'status-character';
  metadata = 'com.simple.combat.menu/metadata';
  contextMenu = 'com.simple.combat.menu/contextMenu';
  id = 'com.simple.combat.menu';
  constructor() {}

  createMenu() {
    const metadata = this.metadata;

      OBR.contextMenu.create({
        id: this.contextMenu,
        icons: [
          {
            icon: '/add.svg',
            label: 'Adicionar ao Combate',
            filter: {
              every: [
                { key: 'layer', value: 'CHARACTER' },
                { key: ['metadata', metadata], value: undefined },
              ],
            },
          },
          {
            icon: '/remove.svg',
            label: 'Remover do Combate',
            filter: {
              every: [{ key: 'layer', value: 'CHARACTER' }],
            },
          },
        ],
        onClick(context) {
          const addToInitiative = context.items.every(
            (item) => item.metadata[metadata] === undefined
          );
          if (addToInitiative) {

            OBR.scene.items.updateItems(context.items, (items) => {
              for (let item of items) {
                const player = new PlayerModel(item.id,item.name,50,50,50)
                item.metadata[metadata] = {
                  player
                };
              }
            });
          } else {
            OBR.scene.items.updateItems(context.items, (items) => {
              for (let item of items) {
                delete item.metadata[metadata];
              }
            });
          }
        },
      });
  }
}
