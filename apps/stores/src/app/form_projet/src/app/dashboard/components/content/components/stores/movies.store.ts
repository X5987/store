import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialMovieState, Movie } from '../models';
import { computed } from '@angular/core';

export const MoviesStore = signalStore(
  // Etat du store
  withState(initialMovieState),

  // List de Methode du store
  withMethods((store) => ({
    create(item: Movie): void {
      item.id = store.items().length + 1;
      patchState(store, { loading: true });
      patchState(store, { items: [...store.items(), item], loading: false });
    },

    edit(item: Movie): void {
      patchState(store, { loading: true });
      patchState(store, {
        items: store
          .items()
          .map((movie) => (movie.id === item.id ? item : movie)),
        loading: false,
      });
    },

    delete(item: Movie): void {
      patchState(store, { loading: true });
      patchState(store, {
        items: store.items().filter((movie) => movie.id !== item.id),
        loading: false,
      });
    },
  })),

  withComputed((store) => ({
    empty: computed<boolean>(() => store.items().length < 1),
  })),
);
