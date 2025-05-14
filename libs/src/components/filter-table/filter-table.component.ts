import { Component, input, model, output } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import {
  MatFormField, MatFormFieldAppearance,
  MatLabel,
  MatSuffix
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
  filterValue = model('');
  appearance=  input<MatFormFieldAppearance>('outline');
  name =  input.required<string>();
  placeholder=  input<string>('Ex: Carbon');
  label=  input<string>('Filter');
  type=  input<string>('text');

  textfilter = output<string>();

  filterFn(value: string) {
    this.textfilter.emit(value);
  }

  public clear() {
    this.filterValue.set('');
    this.filterFn(this.filterValue());
  }
}
