export enum CommunesEnum {
  nom = 'nom',
  code = 'code',
  codeDepartement = 'codeDepartement',
  siren = 'siren',
  codeEpci = 'codeEpci',
  codeRegion = 'codeRegion',
  codesPostaux = 'codesPostaux',
  population = 'population',
  _score = '_score',
}

export interface Communes {
  [CommunesEnum.nom]: string;
  [CommunesEnum.code]: string;
  [CommunesEnum.codeDepartement]: string;
  [CommunesEnum.siren]: string;
  [CommunesEnum.codeEpci]: string;
  [CommunesEnum.codeRegion]: string;
  [CommunesEnum.codesPostaux]: string[];
  [CommunesEnum.population]: number;
  [CommunesEnum._score]: number;
}
