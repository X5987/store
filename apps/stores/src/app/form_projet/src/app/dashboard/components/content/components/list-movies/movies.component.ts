import { Component, inject, output } from '@angular/core';
import { MoviesStore } from '../stores/movies.store';
import { Movie, Movies } from '../models';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardContent, MatCardFooter } from '@angular/material/card';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  imports: [
    AsyncPipe,
    MatIconButton,
    MatIconModule,
    MatCard,
    MatCardContent,
    MatCardFooter,
  ],
})
export class MoviesComponent {
  store = inject(MoviesStore);

  listMovies: Observable<Movies> = toObservable(this.store.items);
  loading: Observable<boolean> = toObservable(this.store.loading);
  editMovie = output<Movie>();
  deleteMovie = output<Movie>();

  edit(movie: Movie) {
    this.editMovie.emit(movie);
  }

  delete(movie: Movie) {
    this.deleteMovie.emit(movie);
  }
}
