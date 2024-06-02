import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SyncPlayersService } from '../../../core/services/OBR/sync-players/sync-players.service';
import { PlayerModel } from '../../../core/models/playerModel';

@Component({
  selector: 'app-combat-menu-player',
  templateUrl: './combat-menu-player.component.html',
  styleUrls: ['./combat-menu-player.component.css'],
})
export class CombatMenuPlayerComponent implements OnInit {
  public players: PlayerModel[] = [];

  constructor(
    private syncPlayersService: SyncPlayersService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.syncPlayersService.playersListUpdated.subscribe(
      (playersList: PlayerModel[]) => {
        this.players = playersList;
        this.cdr.detectChanges();
      }
    );
    // Iniciar a função syncPlayers para começar a ouvir as mudanças
    this.syncPlayersService.syncPlayers();
  }

  updatePlayerLife(player: PlayerModel, life: number | string): void {
    player.updateLife(life);
    this.syncPlayersService.syncPlayers();
  }
  updatePlayerMana(player: PlayerModel, mana: number | string): void {
    player.updateMana(mana);
    this.syncPlayersService.syncPlayers();
  }
  updatePlayerStamina(player: PlayerModel, stamina: number | string): void {
    player.updateStamina(stamina);
    this.syncPlayersService.syncPlayers();
  }
}
