import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { PlayerModel } from '../../core/models/PlayerModel';
import OBR from '@owlbear-rodeo/sdk';
import { ContextMenuService } from '../../core/services/OBR/context-menu/context-menu.service';
import { ListaPlayersService } from '../../core/services/OBR/lista-players/lsita-players.service';
@Component({
  selector: 'app-combat-menu-player',
  templateUrl: './combat-menu-player.component.html',
  styleUrl: './combat-menu-player.component.css',
})
export class CombatMenuPlayerComponent implements OnInit {
  // Lógica do componente
  contextMenuService! : ContextMenuService
  //listaPlayersService!: ListaPlayersService
  public player!: PlayerModel;
  damageAmount!: number ;
  manaAmount!: number ;
  staminaAmount!: number;
  playersList: any[] = []

  constructor(player: PlayerModel, private listaPlayerService : ListaPlayersService,private cdr: ChangeDetectorRef) {
    this.player = player;
    this.player.initialize('Skill', 50, 30, 20);
  }

  ngOnInit(): void {
    this.listaPlayerService.playersListUpdated.subscribe((playersList:any[]) => {
      this.playersList = playersList
      console.log(playersList)
      this.cdr.detectChanges();
    })

  }





}
