import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Tile } from '@stores/libs';
import { SlideFootballImgComponent } from './components/slide/slide-football-img.component';
import { WeatherComponent } from './components/weather/weather.component';
import { FormulaireLambdaComponent } from './components/formulaire/formulaire-lambda.component';
import { MoviesComponent } from './components/list-movies/movies.component';
import { Movie } from './components/models';
import { MoviesStore } from './components/stores/movies.store';
import { FormulaireLambdaServices } from './components/services/formulaire-lambda.services';
import { MatCardModule } from '@angular/material/card';
import { ListPokemonComponent } from './components/list-pokemon/list-pokemon.component';

@Component({
  selector: 'app-content',
  imports: [
    SlideFootballImgComponent,
    WeatherComponent,
    MoviesComponent,
    FormulaireLambdaComponent,
    ListPokemonComponent,
    MatCardModule,
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent implements OnInit {
  @ViewChild('slideFootballImg', { static: true })
  slideFootballImg!: TemplateRef<never>;
  @ViewChild('weather', { static: true }) weather!: TemplateRef<never>;
  @ViewChild('movies', { static: true }) movies!: TemplateRef<never>;
  @ViewChild('formulaire', { static: true }) formulaire!: TemplateRef<never>;
  @ViewChild('movieChat', { static: true }) movieChat!: TemplateRef<never>;
  @ViewChild('listPokemon', { static: true }) listPokemon!: TemplateRef<never>;
  pokemonDatails!: TemplateRef<never>;

  @ViewChild(FormulaireLambdaComponent)
  formulaireLambda!: FormulaireLambdaComponent | undefined;

  tiles: Tile[] = [
    { text: 'slideFootballImg', cols: 2, rows: 2 },
    { text: 'weather', cols: 1, rows: 2 },
    { text: 'movies', cols: 1, rows: 3 },
    { text: 'formulaire', cols: 1, rows: 3 },
    { text: 'movie chat', cols: 1, rows: 3 },
    { text: 'list Pokemon', cols: 3, rows: 3 },
  ];

  store = inject(MoviesStore);
  formService = inject(FormulaireLambdaServices);

  constructor() {}

  ngOnInit(): void {
    const componentTab = [
      this.slideFootballImg,
      this.weather,
      this.formulaire,
      this.movies,
      this.movieChat,
      this.listPokemon,
    ];
    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].context = componentTab[i];
    }
  }

  editMovie($event: Movie) {
    if (this.formulaireLambda?.form) {
      this.formulaireLambda.modeUpdate.set(true);
      this.formulaireLambda.form = this.formService.formulaireLambda({
        id: $event.id,
        title: $event.title,
        description: $event.description,
      });
    }
  }

  deleteMovie($event: Movie) {
    this.store.delete($event);
  }
}
