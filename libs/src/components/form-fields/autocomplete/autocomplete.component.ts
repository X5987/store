import {
  Component,
  computed,
  inject,
  Input,
  model,
  OnInit,
  Self,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  FormControl,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatChipGrid, MatChipInput, MatChipRow } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface AutoCompleteList {
  code: string;
  libelle: string;
}

@Component({
  selector: 'lib-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  imports: [
    CommonModule,
    MatFormField,
    MatChipGrid,
    MatChipRow,
    MatIcon,
    ReactiveFormsModule,
    MatChipInput,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    MatLabel,
    FormsModule,
  ],
})
export class AutocompleteComponent implements OnInit {
  @Input({ required: true }) appearance: 'fill' | 'outline' = 'outline';
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) placeholder: string = '';
  @Input({ required: true }) label: string = '';
  @Input({ required: true }) list!: Signal<AutoCompleteList[]>;

  @Input() isMultiSelect = false;
  @Input() options: { code: string; libelle: string }[] = [];

  readonly currenItem = model('');
  readonly itemsSelected: WritableSignal<AutoCompleteList[]> = signal([]);
  readonly filteredItem: Signal<AutoCompleteList[]> = computed(() => {
    const currentItem = this.currenItem();
    const searchTerm =
      this.currenItem() === 'string' ? currentItem.toLowerCase() : '';

    return searchTerm
      ? this.list().filter((item: AutoCompleteList) =>
          item.libelle.toLowerCase().includes(searchTerm),
        )
      : this.list();
  });

  readonly announcer = inject(LiveAnnouncer);
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    this.itemsSelected.set(this.control.value);
  }

  get control(): FormControl {
    return this.controlDir.control as FormControl;
  }

  writeValue(value: AutoCompleteList[]): void {}

  registerOnChange(fn: (value: AutoCompleteList[]) => void): void {}

  registerOnTouched(fn: () => void): void {}

  remove(index: number): void {
    this.itemsSelected.update((items: AutoCompleteList[]) => {
      items.splice(index, 1);
      this.control.setValue([...items]);
      return [...items];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.itemsSelected.update((items: AutoCompleteList[]) => {
      this.control.setValue([...items, event.option.value]);
      return [...items, event.option.value];
    });
    this.currenItem.set('');
    event.option.deselect();
  }
}
