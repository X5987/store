export interface Geolocation {
  lat: number;
  long: number;
}

export interface Adress {
  geolocation: Geolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

export interface Name {
  firstname: string;
  lastname: string;
}

export enum UserEnum {
  adress = 'adress',
  name = 'name',
  id = 'id',
  email = 'email',
  username = 'username',
  password = 'password',
  phone = 'phone',
  __v = '__v',
}

export interface User {
  [UserEnum.adress]: Adress;
  [UserEnum.name]: Name;
  [UserEnum.id]: number;
  [UserEnum.email]: string;
  [UserEnum.username]: string;
  [UserEnum.password]: string;
  [UserEnum.phone]: string;
  [UserEnum.__v]: number;
}

export const UserElementHeadTab = [
  UserEnum.username,
  UserEnum.email,
  UserEnum.password,
  UserEnum.phone,
  UserEnum.id,
];

export type UserWithoutAdress = Omit<User, UserEnum.adress> &
  Pick<User, UserEnum.name>;

type Mixed = string | number | boolean;
export type StringOrNumber = Extract<Mixed, string | number>;
