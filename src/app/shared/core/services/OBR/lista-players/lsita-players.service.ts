import { Injectable, EventEmitter } from '@angular/core';
import OBR from '@owlbear-rodeo/sdk';

@Injectable({
  providedIn: 'root'
})
export class ListaPlayersService {
  ID: string = "com.tutorial.initiative-tracker";
  playersList: any[] = [];
  playersListUpdated: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor() { }

  setupInitiativeList() {
    const renderList = (items: any) => {
      const playersList = [];
      for (const item of items) {
        const metadata = item.metadata[`${this.ID}/metadata`];
        if (metadata) {
          // Alterar para dados da ficha
          playersList.push({
            player : metadata.statusPlayer
          });
        }
      }
      this.playersList = playersList;
      this.playersListUpdated.emit(this.playersList); // Emitir evento com a lista atualizada
    };

    OBR.scene.items.onChange(renderList);

    // Garantir que o evento é emitido quando a lista está vazia
    renderList(OBR.scene.items);
  }

}
