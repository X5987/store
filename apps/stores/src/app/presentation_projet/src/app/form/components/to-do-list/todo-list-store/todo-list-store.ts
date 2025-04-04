import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed } from '@angular/core';
import { initialTodoListState, ToDoEnumform, ToDoList } from '@stores/libs';

export const TodoListStore = signalStore(
  withState(initialTodoListState),

  withMethods((store) => ({
    create(todo: ToDoList): void {
      todo.id = store.list().length + 1;
      patchState(store, { loading: true });
      patchState(store, {
        list: [...store.list(), todo],
        loading: false,
      });
    },

    edit(item: ToDoList): void {
      patchState(store, { loading: true });
      const updatedList = store
        .list()
        .map((el: ToDoList) => (el[ToDoEnumform.id] === item.id ? item : el));
      patchState(store, { list: updatedList, loading: false });
    },

    delete(item: ToDoList): void {
      patchState(store, { loading: true });
      patchState(store, {
        list: store.list().filter((todo) => todo.id !== item.id),
        loading: false,
      });
    },

    deactiv(id: number): void {
      patchState(store, { loading: true });
      const updatedList = store
        .list()
        .map((el: ToDoList) =>
          el[ToDoEnumform.id] === id
            ? { ...el, [ToDoEnumform.status]: !el[ToDoEnumform.status] }
            : el,
        );
      patchState(store, { list: updatedList, loading: false });
    },
  })),

  withComputed((store) => ({
    empty: computed<boolean>(() => store.list().length === 0),
  })),
);
