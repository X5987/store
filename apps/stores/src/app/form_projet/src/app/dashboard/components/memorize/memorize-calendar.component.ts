import {
  Component,
  inject,
  model,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlStatus,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
} from '@angular/material/card';
import {
  MatCalendar,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-memorize-calendar',
  templateUrl: './memorize-calendar.component.html',
  styleUrl: './memorize-calendar.component.scss',
  imports: [
    MatFormField,
    MatCard,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatInput,
    MatDatepicker,
    MatButton,
    AsyncPipe,
    MatCardHeader,
    MatCardContent,
    DatePipe,
    MatCalendar,
    MatError,
    MatLabel,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [MatDatepickerModule],
})
export class MemorizeCalendarComponent {
  selected = model<Date | null>(null);
  private fb: FormBuilder = inject(FormBuilder);

  startDateLearnForm = this.fb.group({
    firstDateLearn: new FormControl(null, {
      nonNullable: false,
      validators: [Validators.required],
    }),
  });

  protected statusComputeButton: Observable<FormControlStatus> =
    this.startDateLearnForm.controls.firstDateLearn.events.pipe(
      map((event) => {
        console.log(event.source.value);
        return event.source.status;
      }),
    );

  protected tabDate: WritableSignal<Date[] | null> = signal(null);

  dateCompute(date: Date | null): void {
    if (date) {
      const tabPlaningTitle: number[] = [1, 7, 1, 6];
      this.tabDate.set(
        tabPlaningTitle.map((intervalDayAndMonth: number, index: number) => {
          const uniqueDate: Date = date;
          index <= 1
            ? uniqueDate.setDate(date.getDate() + intervalDayAndMonth)
            : uniqueDate.setMonth(date.getMonth() + intervalDayAndMonth);
          return new Date(uniqueDate);
        }),
      );
    }
  }

  clear() {
    this.startDateLearnForm.controls.firstDateLearn.setValue(null, {
      emitEvent: false,
    });
    setTimeout(() => {
      this.startDateLearnForm.controls.firstDateLearn.enable();
    });
  }
}
