export enum PeriodicElementEnum {
  position = 'position',
  name = 'name',
  weight = 'weight',
  symbol = 'symbol',
  active = 'active',
}

export interface PeriodicElement {
  [PeriodicElementEnum.position]: number;
  [PeriodicElementEnum.name]: string;
  [PeriodicElementEnum.weight]: number;
  [PeriodicElementEnum.symbol]: string;
  [PeriodicElementEnum.active]: boolean;
}

export const PeriodicElementHeadTab = [
  PeriodicElementEnum.position,
  PeriodicElementEnum.name,
  PeriodicElementEnum.symbol,
  PeriodicElementEnum.weight,
  PeriodicElementEnum.active,
];

export type Direction = 'Up' | 'Down' | 'Left' | 'Right';
