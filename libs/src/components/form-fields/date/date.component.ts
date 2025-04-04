import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatCalendarCellCssClasses} from '@angular/material/datepicker';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Moment } from 'moment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'backo-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateComponent implements OnInit {
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'outline';
  @Input() control: UntypedFormControl;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() label: string;
  @Input() labelPosition: 'inside' | 'above' = 'above';
  @Input() hiddenDatePublication = false;
  @Input() placeholder: string;
  @Input() minwithoutMoment?: Date;
  @Input() min?: Moment;
  @Input() max?: Moment;
  @Input() filter?: (date: Moment) => boolean;
  @Input() dateClass?: (date: Moment) => MatCalendarCellCssClasses;
  constructor(
    private adapter: DateAdapter<any>,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    this.adapter.setLocale(this.translateService.currentLang);
    this.translateService.onLangChange.pipe(
      map((value: LangChangeEvent | string) => typeof value === 'object' ? value.lang : value))
      .subscribe((value: string) => {
        this.adapter.setLocale(value);
      });
  }

  clear() {
    this.control.disable({ emitEvent: false });
    this.control.setValue('', { emitEvent: false });
    setTimeout(() => {
      this.control.enable();
    });
  }
}
