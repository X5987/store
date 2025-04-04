import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MovieList } from '../../../models/movie.interface';
export interface MovieDetails {
  listMovies: MovieList[];
  movie: MovieList;
}

@Component({
  selector: 'app-movie-details',
  templateUrl: 'movie-details.component.html',
  styleUrls: ['movie-details.component.scss'],
  imports: [MatDialogModule, MatButtonModule, MatIcon],
})
export class MovieDetailsComponent {
  readonly sanitizer: DomSanitizer = inject<DomSanitizer>(DomSanitizer);
  readonly data: MovieDetails = inject<MovieDetails>(MAT_DIALOG_DATA);
  readonly movie: WritableSignal<MovieList> = signal(this.data.movie);
  readonly listMovie: WritableSignal<MovieList[]> = signal(
    this.data.listMovies,
  );
}
