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
  public type: string = 'player';

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
    this.statusLifePercent = (this.statusMana / this.life) * 100;
    this.statusManaPercent = (this.statusMana / this.mana) * 100;
    this.statusStaminaPercent = (this.statusStamina / this.stamina) * 100;
  }

  updateLife(life: number | string) {
    life = Number(life);
    //Vida atualizada é maior que o total de vida do personagem?
    switch (this.statusLife + life < this.life) {
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

  updateMana(mana: number | string) {
    mana = Number(mana);
    //Vida atualizada é maior que o total de vida do personagem?
    switch (this.statusMana + mana < this.mana) {
      case true:
        //Reduz a vida caso life seja negativo, e soma caso positivo
        this.statusMana += mana;
        break;
      case false:
        // Define a vida atual ao maximo
        this.statusMana = this.mana;
        break;
    }
    this.recalPercents();
  }
  updateStamina(stamina: number | string) {
    stamina = Number(stamina);
    //Vida atualizada é maior que o total de vida do personagem?
    switch (this.statusStamina + stamina < this.stamina) {
      case true:
        //Reduz a vida caso life seja negativo, e soma caso positivo
        this.statusStamina += stamina;
        break;
      case false:
        // Define a vida atual ao maximo
        this.statusStamina = this.stamina;
        break;
    }
    this.recalPercents();
  }
  public setMonster() {
    this.type = 'monster';
  }
  public setPlayer() {
    this.type = 'player';
  }

  private recalPercents(): void {
    // Recalcula as porcentagens de status do personagem.
    this.statusLifePercent = (this.statusLife / this.life) * 100;
    this.statusManaPercent = (this.statusMana / this.mana) * 100;
    this.statusStaminaPercent = (this.statusStamina / this.stamina) * 100;
    this.updateStatusBar();
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

  public static fromJSON(data: any): PlayerModel {
    const player = new PlayerModel('', '', 0, 0, 0); // Chamada com valores iniciais
    player.id = data.id;
    player.name = data.name;
    player.life = data.life;
    player.mana = data.mana;
    player.stamina = data.stamina;
    player.statusLife = data.statusLife;
    player.statusMana = data.statusMana;
    player.statusStamina = data.statusStamina;
    player.statusLifePercent = data.statusLifePercent;
    player.statusManaPercent = data.statusManaPercent;
    player.statusStaminaPercent = data.statusStaminaPercent;
    return player;
  }
}
