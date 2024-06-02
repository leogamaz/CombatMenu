import { Component, OnChanges, OnInit, SimpleChanges, contentChild } from '@angular/core';

import OBR, { Metadata } from '@owlbear-rodeo/sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'status-character';
  metadata = 'com.simple.combat.menu/metadata';
  contextMenu = 'com.simple.combat.menu/contextMenu';
  id = 'com.simple.combat.menu';



  constructor() {} // Certifique-se de injetar o serviço no construtor

  ngOnInit(): void {
    const metadata = this.metadata
    OBR.onReady(() => {
      OBR.contextMenu.create({
        id: this.contextMenu,
        icons:[
          {
            icon: 'add.svg',
            label: "Adicionar ao Combate",
            filter: {
              every:[
                {key: "layer", value: "CHARACTER"},
                {key: ["metadata",metadata],value: undefined}
              ]
            }

          },
          {
            icon: 'remove.svg',
            label: "Remover do Combate",
            filter: {
              every:[
                {key: "layer", value: "CHARACTER"},
              ]
            }
          }
        ],
        onClick(context){
          const addToMenu = context.items.every((item) => item.metadata[metadata] === undefined);
          
        }
      })
    });
  }
}
