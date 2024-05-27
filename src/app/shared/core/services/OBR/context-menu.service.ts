import { Injectable } from '@angular/core';
import OBR from '@owlbear-rodeo/sdk';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  ID: string = "com.tutorial.initiative-tracker";

  constructor() { }

  setupContextMenu(){
    console.log('teste');
    OBR.contextMenu.create({
      id: `${this.ID}/context-menu`,
      icons: [
        {
          icon: "/add.svg",
          label: "Adicionar Player",
          filter: {
            every: [{ key: "layer", value: "CHARACTER" },{ key: ["metadata", `${this.ID}/metadata`], value: undefined }],

          }
        },
        {
          icon: "/remove.svg",
          label: "Remover Jogador",
          filter: {
            every: [{ key: "layer", value: "CHARACTER" }],
          },
        },
      ],
      onClick: (context) => {  // Use arrow function to preserve the 'this' context
        const addToInitiative = context.items.every((item)=> item.metadata[`${this.ID}/metadata`] === undefined);
        if (addToInitiative){
          const initiativee = 15;
        OBR.scene.items.updateItems(context.items, (items) => {
          for (let item of items){

            item.metadata[`${this.ID}/metadata`] = {
              initiativee,
            }
            
          }
        });
        }else{
          OBR.scene.items.updateItems(context.items, (items) => {
            for (let item of items) {
              delete item.metadata[`${this.ID}/metadata`]
            }
          });
        }
      },
    });
  }
}
