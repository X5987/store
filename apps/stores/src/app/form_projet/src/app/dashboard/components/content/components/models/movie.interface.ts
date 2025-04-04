import { FormControl } from '@angular/forms';

export interface Movie {
  id: number;
  title: string;
  description: string;
}

export interface MovieForm {
  id: FormControl<number | 0>;
  title: FormControl<string | null>;
  description: FormControl<string | null>;
}

export type Movies = Movie[];

export interface MoviesState {
  items: Movies;
  loading: boolean;
  empty: boolean;
}

export const initialMovieState: MoviesState = {
  items: [
    {
      id: 0,
      title: 'New Movies',
      description: 'New Movies description',
    },
    {
      id: 1,
      title: '2 Movies',
      description: 'New Movies description',
    },
    {
      id: 2,
      title: '3 Movies',
      description: 'New Movies description',
    },
    {
      id: 3,
      title: '4 Movies',
      description: 'New Movies description',
    },
    {
      id: 4,
      title: '5 Movies',
      description: 'New Movies description',
    },
  ],
  loading: false,
  empty: false,
};
