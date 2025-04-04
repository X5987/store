import { FormControl, FormGroup } from '@angular/forms';

export interface TodoDialog {
  inputLabel: string;
  placeholder: string;
  formValue: FormGroup<TodoForm>;
  readonly: boolean;
  disabled: boolean;
  save: string;
  title: string;
  messageTitle: string;
  close: string;
  messagePlaceholder: string;
}

export enum ToDoEnumform {
  id = 'id',
  title = 'title',
  message = 'message',
  status = 'status',
  date = 'date',
  archiveMessage = 'archive',
  action = 'action',
}
export interface Crud {
  edit: boolean;
  view: boolean;
  delete: boolean;
}

export interface ToDoList {
  [ToDoEnumform.id]: number;
  [ToDoEnumform.title]: string;
  [ToDoEnumform.message]: string;
  [ToDoEnumform.status]: boolean;
  [ToDoEnumform.date]: Date;
  [ToDoEnumform.archiveMessage]: boolean;
  [ToDoEnumform.action]?: Crud;
}

export class TodoForm {
  [ToDoEnumform.id]!: FormControl<number>;
  [ToDoEnumform.title]!: FormControl<string>;
  [ToDoEnumform.message]!: FormControl<string>;
  [ToDoEnumform.status]!: FormControl<boolean>;
  [ToDoEnumform.date]!: FormControl<Date>;
  [ToDoEnumform.archiveMessage]!: FormControl<boolean>;
}

export type ToDoLists = ToDoList[];

export interface TodoListState {
  list: ToDoLists;
  loading: boolean;
  empty: boolean;
}

export const initialTodoListState: TodoListState = {
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
  loading: false,
  empty: false,
};
