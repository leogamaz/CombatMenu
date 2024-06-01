import {
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { PlayerModel } from '../../core/models/PlayerModel';
import { ContextMenuService } from '../../core/services/OBR/context-menu/context-menu.service';
import { ListaPlayersService } from '../../core/services/OBR/lista-players/lsita-players.service';
import { UpdatePlayersService } from '../../core/services/OBR/update-players/update-players.service';



@Component({
  selector: 'app-combat-menu-player',
  templateUrl: './combat-menu-player.component.html',
  styleUrl: './combat-menu-player.component.css',
})
export class CombatMenuPlayerComponent implements OnInit {
  // Lógica do componente
  contextMenuService!: ContextMenuService;
  //listaPlayersService!: ListaPlayersService
  public player!: PlayerModel;
  damageAmount!: number;
  manaAmount!: number;
  staminaAmount!: number;
  playersdData: any[] = [];
  players!: PlayerModel[];

  constructor(
    private listaPlayerService: ListaPlayersService,
    private updatePlayerService : UpdatePlayersService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listaPlayerService.playersListUpdated.subscribe(
      (playersdData: any[]) => {
        this.playersdData = playersdData;
        this.players = this.GetInstancePlayers(this.playersdData);
        this.cdr.detectChanges();
      }
    );
  }

  updateLife(player: PlayerModel, life: number | string):void{
    //Atualiza a vida no client
    player.lifeController(life)
    //Atualiza no server
    this.updatePlayerService.UpdatePlayers(player)
    return
  }

  updateMana(player: PlayerModel, mana: number | string):void{
    //Atualiza a vida no client
    player.manaController(mana)
    //Atualiza no server
    this.updatePlayerService.UpdatePlayers(player)
    return
  }

  updateStamina(player: PlayerModel, stamina: number | string):void{
    //Atualiza a vida no client
    player.staminaController(stamina)
    //Atualiza no server
    this.updatePlayerService.UpdatePlayers(player)
    return
  }

  GetInstancePlayers(playersdData: any[]): PlayerModel[] {
    let instacedPlayers: PlayerModel[] = [];
    playersdData.forEach((data) => {
      const player = new PlayerModel(
        data.player.id,
        data.player.name,
        data.player.life,
        data.player.mana,
        data.player.stamina
      );

      instacedPlayers.push(player);
    });

    return instacedPlayers;
  }

}
