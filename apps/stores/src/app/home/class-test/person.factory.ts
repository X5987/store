export class PersonFactory {
  societeName: string | undefined;
  nbrOfSalaries: number | undefined;

  constructor(
    societeName: string | undefined,
    nbrOfSalaries: number | undefined,
  ) {
    this.societeName = societeName;
    this.nbrOfSalaries = nbrOfSalaries;
  }

  getAllSociete() {
    return `Nom de la société: ${this.societeName}
    et possede ${this.nbrOfSalaries} de salariés`;
  }
}
