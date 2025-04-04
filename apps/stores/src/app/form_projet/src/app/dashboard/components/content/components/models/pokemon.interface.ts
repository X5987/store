export interface Pokemon {
  id: number | null;
  pokedexId: number | null;
  name: string | null;
  image?: string | null;
  sprite?: string | null;
  slug?: string | null;
  stats?: Stats | null;
  apiTypes?: ApiTypes[] | null;
  apiGeneration?: number;
  apiResistances?: ApiResistances[] | null;
  resistanceModifyingAbilitiesForApi?: null[] | null;
  apiEvolutions?: ApiEvolutions[] | null;
  apiPreEvolution?: string;
  apiResistancesWithAbilities?: null[] | null;
}

export interface Stats {
  HP: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

export interface ApiTypes {
  name: string;
  image: string;
}

export interface ApiResistances {
  name: string;
  damage_multiplier: number;
  damage_relation: string;
}

export interface ApiEvolutions {
  name: string;
  pokedexId: number;
}
