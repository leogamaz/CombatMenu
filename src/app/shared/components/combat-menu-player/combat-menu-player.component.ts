import { Component, OnInit, ChangeDetectorRef, platformCore} from '@angular/core';
import { PlayerModel } from '../../core/models/PlayerModel';
import OBR, { Player } from '@owlbear-rodeo/sdk';
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
  playersdData: any[] = []
  players! : PlayerModel[]


  constructor(player: PlayerModel, private listaPlayerService : ListaPlayersService,private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.listaPlayerService.playersListUpdated.subscribe((playersdData:any[]) => {
      this.playersdData = playersdData
      this.players = this.GetInstancePlayers(this.playersdData)
      this.cdr.detectChanges();


    })

  }

  GetInstancePlayers(playersdData: any[]): PlayerModel[]{
    let instacedPlayers :PlayerModel[] = []
    playersdData.forEach((data)=>{
      const player = new PlayerModel
      player.name = data.player.name
      player.life = data.player.life
      player.mana = data.player.mana
      player.stamina = data.player.stamina
      player.statusLife = data.player.statusLife
      player.statusMana = data.player.statusMana
      player.statusStamina = data.player.statusStamina
      player.statusLifePercent = data.player.statusLifePercent
      player.statusManaPercent = data.player.statusManaPercent
      player.statusStaminaPercent = data.player.statusStaminaPercent
      instacedPlayers.push(player)
    })

    return instacedPlayers
  }



}
