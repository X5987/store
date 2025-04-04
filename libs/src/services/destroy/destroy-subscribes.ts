import { MonoTypeOperatorFunction, Subject } from 'rxjs';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DestroySubscribes {
  private destroy$ = new Subject<void>();

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroy$.next();
      this.destroy$.complete();
    });
  }

  untilDestroyed<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil(this.destroy$);
  }
}
