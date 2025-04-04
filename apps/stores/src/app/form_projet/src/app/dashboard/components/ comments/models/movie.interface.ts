export interface MovieList {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  ageRating: string;
  time: string;
  quality: string;
  tags: string[];
  favoris: boolean;
  releaseYear: number;
  genres: string[];
  director: string;
  actors: string[];
  isTrending: boolean;
  isNew: boolean;
  trailerUrl: string;
}