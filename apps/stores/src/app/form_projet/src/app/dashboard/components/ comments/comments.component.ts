import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatCard, MatCardImage } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { VideoDescriptionComponent } from './components/netflux/video-description/video-description.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from './components/netflux/movie-details/movie-details.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MovieService } from './services/movie-service';
import { MovieList } from './models/movie.interface';

@Component({
  selector: 'app-comments',
  imports: [
    CommonModule,
    FormsModule,
    MatInput,
    MatCard,
    MatCardImage,
    MatIcon,
    VideoDescriptionComponent,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  private moviesService: MovieService = inject(MovieService);

  listMovies = this.moviesService.getMovies();

  showTrailer: WritableSignal<boolean> = signal(false);
  focusMovie: number | undefined;

  readonly dialog = inject(MatDialog);
  currentMovie: WritableSignal<MovieList | null> = signal(null);
  readonly sanitizer: DomSanitizer = inject<DomSanitizer>(DomSanitizer);

  constructor() {
    this.moviesService.loadMovies();
  }

  searchBar($event: Event) {
    console.log($event.target);
  }

  showMovieTrailer(movie: MovieList) {
    this.focusMovie = movie.id;
    this.currentMovie.set(movie);
    this.showTrailer.set(true);
  }

  hideMovieTrailer() {
    this.focusMovie = undefined;
    this.showTrailer.set(false);
  }

  openDialog() {
    this.dialog.open(MovieDetailsComponent, {
      width: 'calc(100% - 20px)',
      height: 'calc(100% - 20px)',
      maxWidth: '100%',
      maxHeight: '100%',
      data: {
        movie: this.currentMovie(),
        listMovies: this.listMovies(),
      },
    });
  }
}
