import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SyncPlayersService } from '../../../core/services/OBR/sync-players/sync-players.service';
import { PlayerModel } from '../../../core/models/playerModel';
import OBR from '@owlbear-rodeo/sdk';

@Component({
  selector: 'app-combat-menu-player',
  templateUrl: './combat-menu-player.component.html',
  styleUrls: ['./combat-menu-player.component.css'],
})
export class CombatMenuPlayerComponent implements OnInit {
  metadata = 'com.simple.combat.menu/metadata';
  public players: PlayerModel[] = [];
  damageAmount!: number | string;
  manaAmount!: number | string;
  staminaAmount!: number | string;

  constructor(
    private syncPlayersService: SyncPlayersService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.syncPlayersService.playersListUpdated.subscribe(
      (playersList: PlayerModel[]) => {
        this.players = playersList.map(
          (player) =>{
            const newDataPlayer = PlayerModel.fromJSON(player)
            return newDataPlayer}
        );
        this.cdr.detectChanges();
      }
    );
  }

  updatePlayerLife(player: PlayerModel, life: number | string): void {
    player.updateLife(life);
    this.syncPlayersService.pushPlayers(this.players)
    this.damageAmount = ''
  }
  updatePlayerMana(player: PlayerModel, mana: number | string): void {
    player.updateMana(mana);
    this.syncPlayersService.pushPlayers(this.players)
    this.manaAmount = ''
  }
  updatePlayerStamina(player: PlayerModel, stamina: number | string): void {
    player.updateStamina(stamina);
    this.syncPlayersService.pushPlayers(this.players)
    this.staminaAmount = ''
  }

  removeFromCombat(player: PlayerModel){
    OBR.scene.items.updateItems([player.id],(items) => {
      for (let item of items) {
        delete item.metadata[this.metadata];
      }
    })
  }
}
