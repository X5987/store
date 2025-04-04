import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { PokemonService } from './services/pokemon.service';
import { Pokemon } from '../models';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.scss',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatButton,
    MatCardTitle,
    MatSelect,
    MatOption,
    MatFormField,
    MatIcon,
  ],
})
export class ListPokemonComponent implements OnInit, OnDestroy {
  pokemonService: PokemonService = inject(PokemonService);
  router: Router = inject(Router);
  listPokemon: Observable<Pokemon[]> = this.pokemonService.getListPokemon(10);
  private unsubscribe$ = new Subject<void>();
  list = signal<Pokemon[]>([]);
  listNbrPage = signal<number[] | null>([10, 20, 40, 60, 80, 100, 200, 300]);

  ngOnInit(): void {
    this.listPokemon
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((item: Pokemon[]) => this.list.set(item)),
      )
      .subscribe();
  }

  callNewList(nbr: number) {
    this.pokemonService
      .getListPokemon(nbr)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((item: Pokemon[]) => this.list.set(item)),
      )
      .subscribe();
  }

  pokemonDetail(id: number) {
    // this.router.navigateByUrl('/details');
    this.router.navigate(['personal/pokemon-details', id]);
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }
}
