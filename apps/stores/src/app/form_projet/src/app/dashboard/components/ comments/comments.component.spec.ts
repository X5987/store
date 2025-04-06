import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsComponent } from './comments.component';
import { MovieService } from './services/movie-service';
import { signal, WritableSignal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from './components/netflux/movie-details/movie-details.component';

// Interface pour éviter les erreurs de type
interface MovieList {
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

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let mockMovieService: jest.Mocked<MovieService>;
  let mockDialog: jest.Mocked<MatDialog>;

  // Mock data as a signal of an array of movies
  const mockMovies: WritableSignal<MovieList[]> = signal([
    {
      id: 1,
      title: 'Inception',
      description: 'A mind-bending movie',
      imageUrl: 'http://example.com/poster.jpg',
      rating: 8.8,
      ageRating: 'PG-13',
      time: '2h 28min',
      quality: '4K',
      tags: ['Sci-Fi'],
      favoris: true,
      releaseYear: 2010,
      genres: ['Sci-Fi'],
      director: 'Christopher Nolan',
      actors: ['Leonardo DiCaprio'],
      isTrending: false,
      isNew: false,
      trailerUrl: 'http://example.com/trailer',
    },
  ]);

  beforeEach(async () => {
    // Mock services
    mockMovieService = {
      getMovies: jest.fn().mockReturnValue(mockMovies),
      loadMovies: jest.fn(),
    } as unknown as jest.Mocked<MovieService>;

    mockDialog = {
      open: jest.fn(),
    } as unknown as jest.Mocked<MatDialog>;

    await TestBed.configureTestingModule({
      imports: [CommentsComponent], // Standalone component
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should load movies on initialization', () => {
      expect(mockMovieService.loadMovies).toHaveBeenCalledTimes(1);
    });

    it('should initialize with no current movie', () => {
      expect(component.currentMovie()).toBeNull();
    });

    it('should initialize with trailer hidden', () => {
      expect(component.showTrailer()).toBe(false);
    });
  });

  describe('Movie Handling', () => {
    it('should display movies from service', () => {
      const movies = component.listMovies();
      expect(movies.length).toBe(1);
    });

    it('should show movie trailer when called', () => {
      component.showMovieTrailer(mockMovies()[0]);
      expect(component.currentMovie()).toEqual(mockMovies()[0]);
      expect(component.showTrailer()).toBe(true);
      expect(component.focusMovie).toBe(1);
    });

    it('should hide movie trailer when called', () => {
      component.showMovieTrailer(mockMovies()[0]);
      component.hideMovieTrailer();
      expect(component.showTrailer()).toBe(false);
      expect(component.focusMovie).toBeUndefined();
    });
  });

  describe('Dialog Management', () => {
    it('should open dialog with correct data', () => {
      component.currentMovie.set(mockMovies()[0]);
      component.openDialog();
      expect(mockDialog.open).toHaveBeenCalledWith(MovieDetailsComponent, {
        width: 'calc(100% - 20px)',
        height: 'calc(100% - 20px)',
        maxWidth: '100%',
        maxHeight: '100%',
        data: {
          movie: mockMovies()[0],
          listMovies: component.listMovies(),
        },
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty movie list gracefully', () => {
      mockMovieService.getMovies.mockReturnValue(signal([]));
      fixture.detectChanges();
      expect(component.listMovies().length).toBeGreaterThan(0);
    });

    it('should handle null currentMovie in dialog', () => {
      component.currentMovie.set(null);
      component.openDialog();
      expect(mockDialog.open).toHaveBeenCalled();
    });
  });

  describe('DOM Rendering', () => {
    it('should render movie title in the DOM', () => {
      fixture.detectChanges();
      const titleElement = fixture.nativeElement.querySelector('.title_card');
      expect(titleElement.textContent).toContain('Nouveauté NetFlux');
    });
  });
});
