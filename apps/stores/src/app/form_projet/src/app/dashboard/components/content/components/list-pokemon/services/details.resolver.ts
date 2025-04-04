import { inject, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { PokemonService } from './pokemon.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailsDataResolver implements Resolve<any>, OnDestroy {
  service: PokemonService = inject(PokemonService);
  router: Router = inject(Router);
  private destroy$ = new Subject<void>();

  resolve(route: ActivatedRouteSnapshot) {
    return this.service.getPokemonDetails(route.params['id']).value();
  }

  ngOnDestroy() {
    console.log('Resolver est bien détruit');
    this.destroy$.next();
    this.destroy$.complete();
  }
}
