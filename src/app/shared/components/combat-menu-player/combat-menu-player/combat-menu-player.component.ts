import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SyncPlayersService } from '../../../core/services/OBR/sync-players/sync-players.service';
import { PlayerModel } from '../../../core/models/playerModel';
import OBR from '@owlbear-rodeo/sdk';
import { Player } from '@owlbear-rodeo/sdk';

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

  updatePlayerLife(player: PlayerModel, life: number | string): void {
    player.updateLife(life);
    this.syncPlayersService.pushPlayers(this.players);
    this.damageAmount = '';
  }
  updatePlayerMana(
    player: PlayerModel,
    mana: number | string,
    sync: boolean = true
  ): void {
    player.updateMana(mana);
    this.manaAmount = '';
    if (sync) {
      this.syncPlayersService.pushPlayers(this.players);
    }
  }
  updatePlayerStamina(
    player: PlayerModel,
    stamina: number | string,
    sync: boolean = true
  ): void {
    player.updateStamina(stamina);
    this.staminaAmount = '';
    if (sync) {
      this.syncPlayersService.pushPlayers(this.players);
    }
  }

  removeFromCombat(player: PlayerModel) {
    OBR.scene.items.updateItems([player.id], (items) => {
      for (let item of items) {
        delete item.metadata[this.metadata];
      }
    });
  }

  sortDownPlayer(player: PlayerModel) {
    let indexPlayer = this.players.indexOf(player);

    if (indexPlayer == this.players.length - 1) {
      return;
    }

    this.players[indexPlayer] = this.players[indexPlayer + 1];
    this.players[indexPlayer + 1] = player;
    this.orderPlayers = this.players.map((player: PlayerModel) => player.id);
    this.syncPlayersService.pushOrderPlayers(this.orderPlayers);
    this.cdr.detectChanges();
  }
  sortUpPlayer(player: PlayerModel) {
    let indexPlayer = this.players.indexOf(player);

    if (indexPlayer == 0) {
      return;
    }

    this.players[indexPlayer] = this.players[indexPlayer - 1];
    this.players[indexPlayer - 1] = player;
    this.orderPlayers = this.players.map((player: PlayerModel) => player.id);
    this.syncPlayersService.pushOrderPlayers(this.orderPlayers);
    this.cdr.detectChanges();
  }

  nextRound() {
    console.log(this.players);
    this.players.forEach((player) => {
      this.updatePlayerStamina(player, player.regenStamina, false);
      this.updatePlayerMana(player, player.regenMana, false);
    });
    this.moveFirstToLast();
    this.syncPlayersService.pushPlayers(this.players);
  }
  previousRound() {
    this.players.forEach((player) => {
      this.updatePlayerStamina(player, player.regenStamina * 1, false);
      this.updatePlayerMana(player, player.regenMana * 1, false);
    });
    this.reversePlayers();
    this.syncPlayersService.pushPlayers(this.players);
  }

  moveFirstToLast() {
    if (this.players.length > 1) {
      const firstPlayer = this.players.shift();
      if (firstPlayer) {
        this.players.push(firstPlayer);
      }
      this.orderPlayers = this.players.map((player: PlayerModel) => player.id);
      this.syncPlayersService.pushOrderPlayers(this.orderPlayers);
      this.cdr.detectChanges();
    }
  }

  reversePlayers() {
    this.players.reverse();
    this.orderPlayers = this.players.map((player: PlayerModel) => player.id);
    this.syncPlayersService.pushOrderPlayers(this.orderPlayers);
    this.cdr.detectChanges();
  }

  injectOrder(order: Array<string>) {
    this.players.sort((a: PlayerModel, b: PlayerModel) => {
      return order.indexOf(a.id) - order.indexOf(b.id);
    });
  }
}
