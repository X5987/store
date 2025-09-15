import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PeriodicElement } from '../models/table.interface';
import { ToDoEnumform, TodoListState, User } from '@stores/libs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  http: HttpClient = inject(HttpClient);

  getInitialTodoListState(): Observable<TodoListState> {
    return of({
      list: [
        {
          [ToDoEnumform.id]: 0,
          [ToDoEnumform.title]: 'Coco',
          [ToDoEnumform.message]: 'Lorem ioptuilekjnlzeqscqscqscqscqscnflf',
          [ToDoEnumform.status]: true,
          [ToDoEnumform.date]: new Date('01 Jan 1970 00:00:00 GMT'),
          [ToDoEnumform.archiveMessage]: true,
        },
        {
          [ToDoEnumform.id]: 1,
          [ToDoEnumform.title]: 'BOBO',
          [ToDoEnumform.message]: 'Lorem ioptuilekjqscqscqscqsnlzenflf',
          [ToDoEnumform.status]: false,
          [ToDoEnumform.date]: new Date('01 Jan 1970 00:00:00 GMT'),
          [ToDoEnumform.archiveMessage]: false,
        },
        {
          [ToDoEnumform.id]: 2,
          [ToDoEnumform.title]: 'Faire des calins',
          [ToDoEnumform.message]: 'Lorem ioptuilescsckjnlzenflf',
          [ToDoEnumform.status]: true,
          [ToDoEnumform.date]: new Date('01 Jan 1970 00:00:00 GMT'),
          [ToDoEnumform.archiveMessage]: false,
        },
      ],
    });
  }

  getElementPeriodic(): Observable<PeriodicElement[]> {
    return of([
      {
        active: true,
        position: 1,
        name: 'Hydrogen',
        weight: 1.0079,
        symbol: 'H',
      },
      {
        active: true,
        position: 2,
        name: 'Helium',
        weight: 4.0026,
        symbol: 'He',
      },
      {
        active: false,
        position: 3,
        name: 'Lithium',
        weight: 6.941,
        symbol: 'Li',
      },
      {
        active: true,
        position: 4,
        name: 'Beryllium',
        weight: 9.0122,
        symbol: 'Be',
      },
      {
        active: false,
        position: 5,
        name: 'Boron',
        weight: 10.811,
        symbol: 'B',
      },
      {
        active: true,
        position: 6,
        name: 'Carbon',
        weight: 12.0107,
        symbol: 'C',
      },
      {
        active: false,
        position: 7,
        name: 'Nitrogen',
        weight: 14.0067,
        symbol: 'N',
      },
      {
        active: false,
        position: 8,
        name: 'Oxygen',
        weight: 15.9994,
        symbol: 'O',
      },
      {
        active: false,
        position: 9,
        name: 'Fluorine',
        weight: 18.9984,
        symbol: 'F',
      },
      {
        active: false,
        position: 10,
        name: 'Neon',
        weight: 20.1797,
        symbol: 'Ne',
      },
    ]);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://fakestoreapi.com/users');
  }

  // getUserInfo(id: User): Observable<User> {
  //   return this.http.get<User>('https://fakestoreapi.com/users/' + id);
  // }
}
