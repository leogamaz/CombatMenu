import { Component } from '@angular/core';
import { PlayerModel } from '../../core/models/PlayerModel';
import OBR from '@owlbear-rodeo/sdk';
import { ContextMenuService } from '../../core/services/OBR/context-menu/context-menu.service';
import { ListaPlayersService } from '../../core/services/OBR/lista-players/lsita-players.service';
@Component({
  selector: 'app-combat-menu-player',
  templateUrl: './combat-menu-player.component.html',
  styleUrl: './combat-menu-player.component.css',
})
export class CombatMenuPlayerComponent {
  // Lógica do componente
  contextMenuService! : ContextMenuService
  listaPlayersService!: ListaPlayersService
  public player!: PlayerModel;
  damageAmount!: number ;
  manaAmount!: number ;
  staminaAmount!: number;

  constructor(player: PlayerModel,) {
    this.player = player;
    this.player.initialize('Skill', 50, 30, 20);
  }

  showplayers(){
    OBR.onReady(() => {

      let here = this.listaPlayersService.setupInitiativeList();
      console.log('olaa')

    })
  }


}
