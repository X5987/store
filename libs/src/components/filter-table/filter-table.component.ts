import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'lib-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrl: './filter-table.component.scss',
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    MatSuffix,
    MatIconButton,
    MatIcon,
  ],
})
export class FilterTableComponent {
  value = '';
  @Input({ required: true }) appearance: 'fill' | 'outline' = 'outline';
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) placeholder: string = '';
  @Input({ required: true }) label: string = '';
  @Input() inputPlaceholder: string = 'Ex: Carbon';
  isChecked: boolean = false;

  @Output() public textfilter: EventEmitter<string> =
    new EventEmitter<string>();

  filterFn(value: string) {
    this.textfilter.emit(value);
  }

  public clear() {
    this.value = '';
    this.filterFn(this.value);
  }
}
