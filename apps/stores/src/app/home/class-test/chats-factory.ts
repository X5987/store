export interface ChatDescription {
  nom: string | null;
  surNom: string | null;
  ageAnimal: number | null;
  race: string | null;
  anniversaire: Date | string | null;
  size: string | null;
  color: string | null;
  familyName: string | null;
  deathDate: Date | string | null;
  address: string | null;
  phone: string | null;
}

export class ChatsFactory {
  nom: string | null;
  surNom: string | null;
  ageAnimal: number | null;
  race: string | null;
  anniversaire: Date | string | null;
  size: string | null;
  color: string | null;
  familyName: string | null;
  deathDate: Date | string | null;
  address: string | null;
  phone: string | null;

  constructor(item: ChatDescription) {
    this.nom = item.nom;
    this.surNom = item.surNom;
    this.ageAnimal = item.ageAnimal;
    this.race = item.race;
    this.anniversaire = item.anniversaire;
    this.size = item.size;
    this.color = item.color;
    this.familyName = item.familyName;
    this.deathDate = item.deathDate;
    this.address = item.address;
    this.phone = item.phone;
  }
}
