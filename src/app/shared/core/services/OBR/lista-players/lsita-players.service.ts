import { Injectable } from '@angular/core';
import OBR from '@owlbear-rodeo/sdk';

@Injectable({
  providedIn: 'root'
})
export class ListaPlayersService {
  ID: string = "com.tutorial.initiative-tracker";

  constructor() { }

  setupInitiativeList(element:any){
    const renderList = (items:any) =>{
      const initiativeItems = [];
      for (const item of items){
        const metadata = item.metadata[`${this.ID}/metadata`];
        if(metadata){
          initiativeItems.push({
            initiative: metadata.initiative,
            name: item.name
          })
        }
      }
      const sortedItems = initiativeItems.sort(
        (a, b) => parseFloat(b.initiative) - parseFloat(a.initiative)
      );
      // Create new list nodes for each initiative item
      const nodes = [];
      
      for (const initiativeItem of sortedItems) {
        const node = document.createElement("li");
        node.innerHTML = `${initiativeItem.name} (${initiativeItem.initiative})`;
        nodes.push(node);
      }
      element.replaceChildren(...nodes);
    }
    OBR.scene.items.onChange(renderList);
  }

}
