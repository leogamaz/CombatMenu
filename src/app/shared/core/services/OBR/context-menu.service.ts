import { Injectable } from '@angular/core';
import OBR from '@owlbear-rodeo/sdk';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  ID = "com.tutorial.initiative-tracker"

  constructor() { }

  setupContextMenu(){
    console.log('teste')
    OBR.contextMenu.create({
      id:`${this.ID}/context-menu`,
      icons:[
        {
          icon: "/add.svg",
          label: "Adicionar Player",
          filter:{
            every:[{key:"layer", value: "CHARACTER"}]
          }
        }
      ],
      onClick(context){
        const initiative = 15
        OBR.scene.items.updateItems(context.items, (items) =>{
          for (let item of items){

          }
        })
      },
    })
  }

}
