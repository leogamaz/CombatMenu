import { Injectable, Input, Output } from '@angular/core';
import OBR from '@owlbear-rodeo/sdk';

@Injectable({
  providedIn: 'root'
})
export class ListaPlayersService {
  ID: string = "com.tutorial.initiative-tracker";
  playersList: any[] = []


  constructor() { }

  setupInitiativeList(){
    const renderList = (items:any) =>{
      const playersList = []
      for(const item of items){
        const metadata = item.metadata[`${this.ID}/metadata`]
        if(metadata){
          ////ALTERAR PARA DADOS DA FICHA /////
          playersList.push({
            initiative: metadata.initiative,
            name: item.name
          })
        }
      }
      this.playersList = playersList
    }
    OBR.scene.items.onChange(renderList);
    return this.playersList
  }

}
