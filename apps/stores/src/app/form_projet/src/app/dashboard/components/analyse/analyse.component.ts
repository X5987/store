import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  exhaustMap,
  map,
  Observable,
  startWith,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { Communes } from '../../models/commune.interface';
import { MatIconButton } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardModule,
} from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-analyse',
  imports: [
    CommonModule,
    MatCardModule,
    MatCard,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconButton,
    MatInput,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatChipSet,
    MatChip,
    MatIcon,
    MatFormField,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './analyse.component.html',
  styleUrl: './analyse.component.scss',
})
export class AnalyseComponent implements OnInit, OnDestroy {
  dashboardServices: DashboardService = inject(DashboardService);

  @ViewChild('myInput') myInput!: ElementRef<HTMLInputElement>;

  communeDefaut: string = 'paris';

  frappeAuxClavier$: BehaviorSubject<string> = new BehaviorSubject(
    this.communeDefaut,
  );
  result$: Observable<Communes[]> = new Observable();
  unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.frappeAuxClavier$
      .asObservable()
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500),
        startWith(this.communeDefaut),
        map((text: string): string => text),
        distinctUntilChanged(),
        exhaustMap(
          (csc: string) =>
            (this.result$ = this.dashboardServices.getCommune(csc)),
        ),
        tap((res) => console.log('res', res)),
      )
      .subscribe();
  }

  learn($event: Event) {
    const text = $event.target as HTMLInputElement;
    this.frappeAuxClavier$.next(text.value);
  }

  ngOnDestroy() {
    this.frappeAuxClavier$.unsubscribe();
    this.unsubscribe$.unsubscribe();
  }
}
