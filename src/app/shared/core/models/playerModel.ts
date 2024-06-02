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
  public id: string;

  constructor(
    id: string,
    name: string,
    life: number,
    mana: number,
    stamina: number
  ) {
    this.id = id;
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

  updateLife(life: number | string): void {
    life = Number(life);
    //Vida atualizada é maior que o total de vida do personagem?
    switch (this.statusLife + life > this.life) {
      case true:
        //Reduz a vida caso life seja negativo, e soma caso positivo
        this.statusLife += life;
        break;
      case false:
        // Define a vida atual ao maximo
        this.statusLife = this.life;
        break;
    }
    this.recalPercents();
  }

  updateMana(mana: number | string): void {
    mana = Number(mana);
    //Mana atualizada é maior que o total de mana do personagem?
    switch (this.statusMana + mana > this.mana) {
      case true:
        //Reduz a vida caso mana seja negativo, e soma caso positivo
        this.statusMana += mana;

        break;
      case false:
        // Define a mana atual ao maximo
        this.statusMana = this.mana;
        break;
    }
    this.recalPercents();
  }

  updateStamina(stamina: number | string): void {
    stamina = Number(stamina);
    //Stamina atualizada é maior que o total de Stamina do personagem?
    switch (this.statusStamina + stamina > this.stamina) {
      case true:
        //Reduz a Stamina caso life seja negativo, e soma caso positivo
        this.statusStamina += stamina;

        break;
      case false:
        // Define a Stamina atual ao maximo
        this.statusStamina = this.stamina;
        break;
    }
    this.recalPercents();
  }

  private recalPercents(): void {
    // Recalcula as porcentagens de status do personagem.
    this.statusLifePercent = (this.life / this.statusLife) * 100;
    this.statusManaPercent = (this.mana / this.statusMana) * 100;
    this.statusStaminaPercent = (this.stamina / this.statusStamina) * 100;
    this.updateStatusBar()
  }

  private updateStatusBar(): void {
    let healthFill = document.getElementById('health-fill');
    if (healthFill) {
      healthFill.style.width = `${this.statusLifePercent}%`;
    }

    let manaFill = document.getElementById('mana-fill');
    if (manaFill) {
      manaFill.style.width = `${this.statusManaPercent}%`;
    }

    let staminaFill = document.getElementById('stamina-fill');
    if (staminaFill) {
      staminaFill.style.width = `${this.statusStaminaPercent}%`;
    }
  }
}
