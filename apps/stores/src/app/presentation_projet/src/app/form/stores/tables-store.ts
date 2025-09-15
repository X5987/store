import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { ToDoEnumform, ToDoList, TodoListState } from '@stores/libs';
import { take, tap } from 'rxjs';
import { FormService } from '../services/form.service';

export const TablesStore = signalStore(
  { providedIn: 'root' }, // Rend le store disponible globalement
  withState<TodoListState>({
    list: [],
  }),
  withMethods((store) => {
    return {
      create(item: ToDoList): void {
        item.id = store.list().length + 1;
        patchState(store, {
          list: [...store.list(), item],
        });
      },
      edit(item: ToDoList): void {
        patchState(store, {
          list: store.list().map((el) => (el.id === item.id ? item : el)),
        });
      },
      delete(item: ToDoList): void {
        patchState(store, {
          list: store.list().filter((todo) => todo.id !== item.id),
        });
      },
      deactiv(id: number): void {
        const updatedList = store
          .list()
          .map((el: ToDoList) =>
            el[ToDoEnumform.id] === id
              ? { ...el, [ToDoEnumform.status]: !el[ToDoEnumform.status] }
              : el
          );
        patchState(store, { list: updatedList });
      },
    };
  }),
  withHooks((store, formService = inject(FormService)) => ({
    onInit() {
      formService
        .getInitialTodoListState()
        .pipe(
          take(1),
          tap((data) => {
            console.log('UserStore initialized', data.list);
            patchState(store, { list: data.list });
          })
        ).subscribe();
    },
    onDestroy() {
      // avec providedIn: 'root', le hook onDestroy ne sera jamais appelé car
      // le store existe pendant toute la durée de vie de l'application
      console.log('UserStore destroyed');
    },
  })),
  withComputed((store) => ({
    empty: computed<boolean>(() => store.list().length === 0),
  }))
);
