import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Product } from '@stores/libs';
import { FormulService } from './formul.service';
import { Observable, of } from 'rxjs';

export interface FormulData {
  listProduct: Observable<Product[]>;
}

@Injectable({
  providedIn: 'root',
})
export class FormulDataResolver implements Resolve<FormulData> {
  service: FormulService = inject(FormulService);

  resolve(): Observable<FormulData> {
    const listNum$ = of([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    ]);

    listNum$.pipe().subscribe();

    return of({ listProduct: of([]) });
  }
}
