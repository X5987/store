import { ChatsFactory } from './chats-factory';
import { PersonFactory } from './person.factory';

export class EmployeeFactory extends PersonFactory {
  name: string;
  surname: string;
  age: number | null = null;
  birthday!: Date | string;
  animalPref: ChatsFactory | null;

  constructor(
    name: string,
    surname: string,
    age: number,
    birthday: Date | string,
    animalPref: ChatsFactory | null,
  ) {
    super('nike', 10);
    this.name = name;
    this.surname = surname;
    this.birthday = birthday;
    this.age = age;
    this.animalPref = animalPref || null;
  }

  static ageCompute(age: number | null): number | null {
    return age ? age * 100 : null;
  }

  setBirthday(birthday: Date): void;
  setBirthday(value: string): void;
  setBirthday(birthday: any): void {
    if (birthday instanceof Date) {
      this.birthday = birthday;
    }
    if (typeof birthday === 'string') {
      this.birthday = new Date(birthday);
    }
  }
}
