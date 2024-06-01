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
  public id :string

  constructor(id:string ,name: string, life: number, mana: number, stamina: number) {
    this.id = id
    this.name = name;
    this.life = life;
    this.mana = mana;
    this.stamina = stamina;
    this.statusLife = life;
    this.statusMana = mana;
    this.statusStamina = stamina;
    this.statusLifePercent = (this.life / this.statusLife) * 100;
    this.statusManaPercent = (this.mana / this.statusMana) * 100;
    this.statusStaminaPercent = (this.stamina / this.statusStamina) * 100;
  }



  lifeController(life: number | string) {
    life = Number(life);
    if (this.statusLife + life > this.life) {
      this.statusLife = this.life;
      this.updatePercentStatus();
      this.updateStatusBar('health');
      return;
    }
    this.statusLife += life;
    this.updatePercentStatus();
    this.updateStatusBar('health');
    return;
  }
  manaController(mana: number | string) {
    mana = Number(mana);
    if (this.statusMana + mana > this.mana) {
      this.statusMana = this.mana;
      this.updatePercentStatus();
      this.updateStatusBar('mana');
      return;
    }
    this.statusMana += mana;
    this.updatePercentStatus();
    this.updateStatusBar('mana');
    return;
  }
  staminaController(stamina: number | string) {
    stamina = Number(stamina);
    if (this.statusStamina + stamina > this.stamina) {
      this.statusStamina = this.stamina;
      this.updatePercentStatus();
      this.updateStatusBar('stamina');
      return;
    }
    this.statusStamina += stamina;
    this.updatePercentStatus();
    this.updateStatusBar('stamina');
    return;
  }

  private updatePercentStatus() {
    this.statusLifePercent = (this.statusLife / this.life) * 100;
    this.statusManaPercent = (this.statusMana / this.mana) * 100;
    this.statusStaminaPercent = (this.statusStamina / this.stamina) * 100;
    this.statusLifePercent = Math.floor(this.statusLifePercent);
    this.statusStaminaPercent = Math.floor(this.statusStaminaPercent);
    this.statusManaPercent = Math.floor(this.statusManaPercent);
  }

  private updateStatusBar(bar: string) {
    switch (bar) {
      case 'health':
        let healthFill = document.querySelector<HTMLElement>(
          `#player-${this.name} #health-fill`
        );
        //let healthFill = document.getElementById('health-fill')
        if (healthFill) {
          healthFill.style.width = `${this.statusLifePercent}%`;
        }
        break;
      case 'mana':
        let manaFill = document.querySelector<HTMLElement>(
          `#player-${this.name} #mana-fill`
        );
        if (manaFill) {
          manaFill.style.width = `${this.statusManaPercent}%`;
        }
        break;
      case 'stamina':
        let staminaFill = document.querySelector<HTMLElement>(
          `#player-${this.name} #stamina-fill`
        );
        if (staminaFill) {
          staminaFill.style.width = `${this.statusStaminaPercent}%`;
        }
        break;
    }
  }
}
