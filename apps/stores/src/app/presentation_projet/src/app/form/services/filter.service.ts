import { Injectable } from '@angular/core';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filterList<T>(
    data$: Observable<T[]>,
    filterText$: Subject<string>,
    condition: (item: T, text: string, toggle?: boolean) => boolean,
    toggle$?: Subject<boolean>,
  ): Observable<T[]> {
    if (toggle$) {
      return combineLatest([data$, filterText$, toggle$]).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(([list, text, toggle]) =>
          list.filter((item) => condition(item, text, toggle)),
        ),
      );
    } else {
      return combineLatest([data$, filterText$]).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(([list, text]) => list.filter((item) => condition(item, text))),
      );
    }
  }
}
