import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http: HttpClient = inject(HttpClient);
  private url: string = `https://pokebuildapi.fr/api/v1/pokemon/`;

  getListPokemon(pageSize: number): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.url}limit/${pageSize}`);
  }

  getPokemonDetails(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.url}${id}`);
  }
}
