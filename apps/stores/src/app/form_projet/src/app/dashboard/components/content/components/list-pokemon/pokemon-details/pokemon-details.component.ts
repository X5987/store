import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { PokemonService } from '../services/pokemon.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
  imports: [RouterLink, MatToolbar, MatButton, NgIf],
})
export class PokemonDetailsComponent {
  service: PokemonService = inject(PokemonService);
  router: ActivatedRoute = inject(ActivatedRoute);
  currentId = signal<number>(0);

  readonly pokemon = rxResource({
    request: () => ({ id: this.currentId() }),
    loader: () => this.service.getPokemonDetails(this.currentId()),
  }).value;

  constructor() {
    this.router.params
      .pipe(
        take(1),
        tap((params) => this.currentId.set(params['id'])),
      )
      .subscribe();

    // this.service
    //   .getPokemonDetails(this.currentId())
    //   .pipe(tap((poke) => this.pokemon.set(poke)))
    //   .subscribe();
  }

  get getRatioPower(): number {
    const stats = this.pokemon()?.stats;
    if (!stats) return 0;
    return (
      stats.attack +
      stats.speed +
      stats.defense +
      stats.special_attack +
      stats.special_defense
    );
  }
}
