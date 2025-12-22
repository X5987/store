import {
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { PokemonService } from '../services/pokemon.service';
import { NgOptimizedImage } from '@angular/common';
import { Pokemon } from '../../models';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
  imports: [RouterLink, MatToolbar, MatButton, NgOptimizedImage],
})
export class PokemonDetailsComponent {
  service: PokemonService = inject(PokemonService);
  route: ActivatedRoute = inject(ActivatedRoute);
  currentId = signal<number>(0);

  // pokemon = httpResource({
  //   params: () => this.currentId(),
  //   loader: ({ params }: ResourceLoaderParams<number>) => {
  //     return this.service.getPokemonDetails(params) as Observable<Pokemon>;
  //   },
  // });

  pokemon  = signal<Pokemon>(
    {
      id: 0,
      pokedexId: 0,
      name: '',
      image: '',
      sprite: '',
      slug: '',
      apiGeneration: 0,
      apiPreEvolution: '',
    }
  );

  constructor() {
    this.route.params.subscribe((params) => {
      this.currentId.set(Number(params['id']));
    });

    effect(() => {
      this.service
        .getPokemonDetails(this.currentId())
        .subscribe((pokemon: Pokemon) => {
          this.pokemon.set(pokemon);
        });
    });
  }

  protected readonly PokemonService = PokemonService;
}
