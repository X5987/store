import { Injectable, signal } from '@angular/core';
import { MovieList } from '../models/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private movies = signal<MovieList[]>([]);

  loadMovies() {
    this.movies.set([
      {
        id: 1,
        title: 'Interstellar',
        description:
          "Un groupe d'explorateurs voyage à travers un trou de ver dans l'espace.",
        imageUrl:
          'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        rating: 8.6,
        ageRating: 'PG-13',
        time: '2h 49min',
        quality: '4K',
        tags: ['Science-fiction', 'Drame', 'Aventure'],
        favoris: false,
        releaseYear: 2014,
        genres: ['Science-fiction', 'Aventure', 'Drame'],
        director: 'Christopher Nolan',
        actors: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
        isTrending: true,
        isNew: false,
        trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
      },
      {
        id: 2,
        title: 'Inception',
        description:
          "Un voleur manipule les rêves pour implanter une idée dans l'esprit d'un homme.",
        imageUrl:
          'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
        rating: 8.8,
        ageRating: 'PG-13',
        time: '2h 28min',
        quality: '4K',
        tags: ['Science-fiction', 'Thriller', 'Action'],
        favoris: true,
        releaseYear: 2010,
        genres: ['Science-fiction', 'Action', 'Thriller'],
        director: 'Christopher Nolan',
        actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
        isTrending: false,
        isNew: false,
        trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
      },
      {
        id: 3,
        title: 'The Dark Knight',
        description: 'Batman affronte le Joker qui sème le chaos à Gotham.',
        imageUrl:
          'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        rating: 9.0,
        ageRating: 'PG-13',
        time: '2h 32min',
        quality: '4K',
        tags: ['Action', 'Crime', 'Drame'],
        favoris: false,
        releaseYear: 2008,
        genres: ['Action', 'Crime', 'Drame'],
        director: 'Christopher Nolan',
        actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
        isTrending: true,
        isNew: false,
        trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
      },
      {
        id: 4,
        title: 'Avatar',
        description:
          'Un marine paraplégique est envoyé sur Pandora où il doit choisir son camp.',
        imageUrl:
          'https://image.tmdb.org/t/p/w500/kmcqlZGaSh20zpTbuoF0Cdn07dT.jpg',
        rating: 7.8,
        ageRating: 'PG-13',
        time: '2h 42min',
        quality: '4K',
        tags: ['Science-fiction', 'Aventure', 'Action'],
        favoris: true,
        releaseYear: 2009,
        genres: ['Science-fiction', 'Aventure'],
        director: 'James Cameron',
        actors: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
        isTrending: false,
        isNew: false,
        trailerUrl: 'https://www.youtube.com/embed/5PSNL1qE6VY',
      },
      {
        id: 5,
        title: 'Gladiator',
        description:
          'Un général romain trahi revient comme gladiateur pour se venger.',
        imageUrl:
          'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
        rating: 8.5,
        ageRating: 'R',
        time: '2h 35min',
        quality: '4K',
        tags: ['Action', 'Drame', 'Historique'],
        favoris: false,
        releaseYear: 2000,
        genres: ['Action', 'Drame', 'Historique'],
        director: 'Ridley Scott',
        actors: ['Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen'],
        isTrending: false,
        isNew: false,
        trailerUrl: 'https://www.youtube.com/embed/P5ieIbInFpg',
      },
      {
        id: 6,
        title: 'The Matrix',
        description:
          'Un programmeur découvre que la réalité est une illusion créée par des machines.',
        imageUrl:
          'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
        rating: 8.7,
        ageRating: 'R',
        time: '2h 16min',
        quality: '4K',
        tags: ['Science-fiction', 'Action'],
        favoris: true,
        releaseYear: 1999,
        genres: ['Science-fiction', 'Action'],
        director: 'Lana Wachowski, Lilly Wachowski',
        actors: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
        isTrending: true,
        isNew: false,
        trailerUrl: 'https://www.youtube.com/embed/vKQi3bBA1y8',
      },
      {
        id: 7,
        title: 'Forrest Gump',
        description:
          "L'histoire touchante d'un homme simple aux rencontres extraordinaires.",
        imageUrl:
          'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg',
        rating: 8.8,
        ageRating: 'PG-13',
        time: '2h 22min',
        quality: 'HD',
        tags: ['Drame', 'Romance'],
        favoris: false,
        releaseYear: 1994,
        genres: ['Drame', 'Romance'],
        director: 'Robert Zemeckis',
        actors: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
        isTrending: false,
        isNew: false,
        trailerUrl: 'https://www.youtube.com/embed/bLvqoHBptjg',
      },
      {
        id: 8,
        title: 'The Lion King',
        description:
          'Un jeune lion doit prendre la place de son père comme roi de la savane.',
        imageUrl:
          'https://image.tmdb.org/t/p/w500/2bXbqYudnkXndrxM9mcIMTyOmMY.jpg',
        rating: 8.5,
        ageRating: 'G',
        time: '1h 29min',
        quality: 'HD',
        tags: ['Animation', 'Aventure', 'Drame'],
        favoris: true,
        releaseYear: 1994,
        genres: ['Animation', 'Aventure', 'Drame'],
        director: 'Roger Allers, Rob Minkoff',
        actors: ['Matthew Broderick', 'Jeremy Irons', 'James Earl Jones'],
        isTrending: true,
        isNew: false,
        trailerUrl: 'https://www.youtube.com/embed/7TavVZMewpY',
      },
      {
        id: 1,
        title: 'Interstellar',
        description:
          "Un groupe d'explorateurs voyage à travers un trou de ver dans l'espace.",
        imageUrl:
          'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        rating: 8.6,
        ageRating: 'PG-13',
        time: '2h 49min',
        quality: '4K',
        tags: ['Science-fiction', 'Drame', 'Aventure'],
        favoris: false,
        releaseYear: 2014,
        genres: ['Science-fiction', 'Aventure', 'Drame'],
        director: 'Christopher Nolan',
        actors: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
        isTrending: true,
        isNew: false,
        trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
      },
      {
        id: 2,
        title: 'Inception',
        description:
          "Un voleur manipule les rêves pour implanter une idée dans l'esprit d'un homme.",
        imageUrl:
          'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
        rating: 8.8,
        ageRating: 'PG-13',
        time: '2h 28min',
        quality: '4K',
        tags: ['Science-fiction', 'Thriller', 'Action'],
        favoris: true,
        releaseYear: 2010,
        genres: ['Science-fiction', 'Action', 'Thriller'],
        director: 'Christopher Nolan',
        actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
        isTrending: false,
        isNew: false,
        trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
      },
      {
        id: 3,
        title: 'The Dark Knight',
        description: 'Batman affronte le Joker qui sème le chaos à Gotham.',
        imageUrl:
          'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        rating: 9.0,
        ageRating: 'PG-13',
        time: '2h 32min',
        quality: '4K',
        tags: ['Action', 'Crime', 'Drame'],
        favoris: false,
        releaseYear: 2008,
        genres: ['Action', 'Crime', 'Drame'],
        director: 'Christopher Nolan',
        actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
        isTrending: true,
        isNew: false,
        trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY',
      },
      {
        id: 4,
        title: 'Avatar',
        description:
          'Un marine paraplégique est envoyé sur Pandora où il doit choisir son camp.',
        imageUrl:
          'https://image.tmdb.org/t/p/w500/kmcqlZGaSh20zpTbuoF0Cdn07dT.jpg',
        rating: 7.8,
        ageRating: 'PG-13',
        time: '2h 42min',
        quality: '4K',
        tags: ['Science-fiction', 'Aventure', 'Action'],
        favoris: true,
        releaseYear: 2009,
        genres: ['Science-fiction', 'Aventure'],
        director: 'James Cameron',
        actors: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
        isTrending: false,
        isNew: false,
        trailerUrl: 'https://www.youtube.com/embed/5PSNL1qE6VY',
      },
      {
        id: 5,
        title: 'Gladiator',
        description:
          'Un général romain trahi revient comme gladiateur pour se venger.',
        imageUrl:
          'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
        rating: 8.5,
        ageRating: 'R',
        time: '2h 35min',
        quality: '4K',
        tags: ['Action', 'Drame', 'Historique'],
        favoris: false,
        releaseYear: 2000,
        genres: ['Action', 'Drame', 'Historique'],
        director: 'Ridley Scott',
        actors: ['Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen'],
        isTrending: false,
        isNew: false,
        trailerUrl: 'https://www.youtube.com/embed/P5ieIbInFpg',
      },
    ]);
  }

  getMovies() {
    return this.movies.asReadonly();
  }

  private removeDuplicates(movies: MovieList[]) {
    return [...new Map(movies.map((m) => [m.id, m])).values()];
  }
}
