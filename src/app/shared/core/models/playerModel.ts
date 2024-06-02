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
}
