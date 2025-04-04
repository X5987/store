import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Communes } from '../models/commune.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http: HttpClient = inject(HttpClient);

  getCommune(communeNom: string): Observable<Communes[]> {
    return new Observable((observer) => {
      fetch('https://geo.api.gouv.fr/communes?nom=' + communeNom)
        .then((res) => res.json())
        .then((communes: Communes[]) => {
          observer.next(communes);
          observer.complete();
        });
    });
  }
}
