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
  public statusLifePercent: number;
  public statusManaPercent: number;
  public statusStaminaPercent: number;

  constructor() {
    this.name = '';
    this.life = 0;
    this.mana = 0;
    this.stamina = 0;
    this.statusLife = 0;
    this.statusMana = 0;
    this.statusStamina = 0;
    this.statusLifePercent = 0;
    this.statusManaPercent = 0;
    this.statusStaminaPercent = 0;
  }

  initialize(name: string, life: number, mana: number, stamina: number) {
    this.name = name;
    this.life = life;
    this.mana = mana;
    this.stamina = stamina;
    this.statusLife = life;
    this.statusMana = mana;
    this.statusStamina = stamina;
    this.statusLifePercent = (this.life / this.statusLife) * 100;
    this.statusManaPercent = (this.life / this.statusLife) * 100;
    this.statusStaminaPercent = (this.life / this.statusLife) * 100;
  }

  lifeController(life: number | string) {
    life = Number(life);
    if(this.statusLife + life > this.life){
      this.statusLife = this.life
      this.updatePercentStatus();
      this.updateStatusBar('health')
      console.log(this.statusLifePercent)
      return
    }
    this.statusLife += life;
    this.updatePercentStatus();
    this.updateStatusBar('health')
    return;
  }
  manaController(mana: number | string) {
    mana = Number(mana);
    if(this.statusMana + mana > this.mana){
      this.statusMana = this.mana
      this.updatePercentStatus();
      this.updateStatusBar('mana')
      return
    }
    this.statusMana += mana;
    this.updatePercentStatus();
    this.updateStatusBar('mana')
    return;
  }
  staminaController(stamina: number | string) {
    stamina = Number(stamina);
    if(this.statusStamina + stamina > this.stamina){
      this.statusStamina = this.stamina
      this.updatePercentStatus();
      this.updateStatusBar('stamina')
      return
    }
    this.statusStamina += stamina;
    this.updatePercentStatus();
    this.updateStatusBar('stamina')
    return;
  }


  private updatePercentStatus() {
      this.statusLifePercent = (this.statusLife / this.life) * 100;
      this.statusManaPercent = (this.statusMana / this.mana) * 100;
      this.statusStaminaPercent = (this.statusStamina/this.stamina) * 100;

      this.statusLifePercent = Math.floor(this.statusLifePercent);
      this.statusStaminaPercent = Math.floor(this.statusStaminaPercent);
      this.statusManaPercent = Math.floor(this.statusManaPercent);
  }

  private updateStatusBar(bar:string){
    switch (bar){
      case 'health':
        let healthFill = document.querySelector<HTMLElement>(`#player-${this.name} #health-fill`)
        //let healthFill = document.getElementById('health-fill')
        if(healthFill){
          healthFill.style.width = `${this.statusLifePercent}%`
        }
      break
      case 'mana':
        let manaFill = document.querySelector<HTMLElement>(`#player-${this.name} #mana-fill`)
        if(manaFill){
          manaFill.style.width = `${this.statusManaPercent}%`
        }
      break
      case 'stamina':
        let staminaFill = document.querySelector<HTMLElement>(`#player-${this.name} #stamina-fill`)
        console.log(document.querySelector('#player-'+this.name))
        if(staminaFill){
          staminaFill.style.width = `${this.statusStaminaPercent}%`
        }
      break
    }
  }
}
