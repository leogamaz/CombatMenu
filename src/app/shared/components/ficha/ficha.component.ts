import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SyncPlayersService } from '../../core/services/OBR/sync-players/sync-players.service';
import { PlayerModel } from '../../core/models/playerModel';
import OBR from '@owlbear-rodeo/sdk';
import { Player } from '@owlbear-rodeo/sdk';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrl: './ficha.component.css',
})
export class FichaComponent {
  metadata = 'com.simple.combat.menu/metadata';
  public players: PlayerModel[] = [];
  damageAmount!: number | string;
  manaAmount!: number | string;
  staminaAmount!: number | string;
  orderPlayers: Array<string> = [];
  playerRole!: string;

  constructor(
    private syncPlayersService: SyncPlayersService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // TODO: REFAZER E COLOCAR NO APP.COMPONENTS OBR.onReady
    setTimeout(() => {
      OBR.player.getRole().then((result) => (this.playerRole = result));
    }, 300);
    this.syncPlayersService.playersListUpdated.subscribe(
      (playersList: PlayerModel[]) => {
        this.players = playersList.map((player) => {
          const newDataPlayer = PlayerModel.fromJSON(player);
          return newDataPlayer;
        });
        this.injectOrder(this.orderPlayers);
        this.cdr.detectChanges();
      }
    );
    this.syncPlayersService.orderPlayersUpdated.subscribe(
      (order: Array<string>) => {
        this.orderPlayers = order;
        this.injectOrder(order);
        this.cdr.detectChanges();
      }
    );
  }

  injectOrder(order: Array<string>) {
    this.players.sort((a: PlayerModel, b: PlayerModel) => {
      return order.indexOf(a.id) - order.indexOf(b.id);
    });
  }
  updatePlayer(
    id: string,
    life: string,
    mana: string,
    stamina: string,
    regenMana: string,
    regenStamina: string,
    typeSelect: string,
    player: PlayerModel
  ) {
    typeSelect == 'player' ? player.setPlayer() : player.setMonster();
    player.life = this.parseValue(life, player.life);
    player.statusLife = player.life;
    player.mana = this.parseValue(mana, player.mana);
    player.statusMana = player.mana;
    player.stamina = this.parseValue(stamina, player.stamina);
    player.statusStamina = player.stamina;
    player.regenMana = this.parseValue(regenMana, player.regenMana);
    player.regenStamina = this.parseValue(regenStamina, player.regenStamina);
    player.recalPercents();
    this.syncPlayersService.pushPlayer(player);
  }

  private parseValue(newValue: string, defaultValue: number): number {
    return newValue != '' && newValue != null && newValue != undefined
      ? Number(newValue)
      : defaultValue;
  }
}
