import { Component, input, output, Self, signal } from '@angular/core';
import {
  FormControl,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  imports: [
    CommonModule,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatIconButton,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIcon,
  ],
})
export class InputTextComponent {
  appearance = input<'fill' | 'outline'>('outline');
  label = input.required<string>();
  placeholder = input.required<string>();
  id = input<string>('');
  type = input<string>('');
  typePassword = input<boolean>(false);
  readonly = input<boolean>(false);
  disabled = input<boolean>(false);
  min = input<number>(0);
  max = input<number>(0);
  minlength = input<number>(0);
  maxlength = input<number>(0);
  upperCaseActive = input<boolean>(false);
  specialCharOmit = input<boolean>(false);
  showText = output<boolean>();
  stateShowText = signal(false);

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  writeValue(value: never) {
    if (value) {
      this.control.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: (value: never) => void): void {
    this.control.valueChanges.subscribe((fn) => {});
  }

  registerOnTouched(fn: any): void {}

  get control(): FormControl {
    return this.controlDir.control as FormControl;
  }

  clear() {
    this.control.disable({ emitEvent: false });
    this.control.setValue('', { emitEvent: false });
    setTimeout(() => {
      this.control.enable();
    });
  }

  showPassword() {
    this.stateShowText.set(!this.stateShowText());
    this.showText.emit(!this.stateShowText());
  }
}
