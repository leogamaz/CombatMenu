import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlayerModel {
  public name: string;
  public life: number;
  public mana: number;
  public stamina: number;
  public statusLife: number;
  public statusMana: number;
  public statusStamina: number;

  constructor() {
    this.name = '';
    this.life = 0;
    this.mana = 0;
    this.stamina = 0;
    this.statusLife = 0;
    this.statusMana = 0;
    this.statusStamina = 0;
  }

  initialize(name: string, life: number, mana: number, stamina: number) {
    this.name = name;
    this.life = life;
    this.mana = mana;
    this.stamina = stamina;
    this.statusLife = life;
    this.statusMana = mana;
    this.statusStamina = stamina;
  }

  damage(damage: number | string) {
    this.statusLife -= Number(damage);
  }
}
