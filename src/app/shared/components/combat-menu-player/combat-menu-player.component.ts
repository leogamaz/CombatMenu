import { Component } from '@angular/core';
import { PlayerModel } from '../../core/models/PlayerModel';

@Component({
  selector: 'app-combat-menu-player',
  templateUrl: './combat-menu-player.component.html',
  styleUrl: './combat-menu-player.component.css',
})
export class CombatMenuPlayerComponent {
  // Lógica do componente
  public player: PlayerModel;
  damageAmount: number = 0;

  constructor(player: PlayerModel) {
    this.player = player;
    this.player.initialize('Skill', 50, 30, 20);
  }
}
