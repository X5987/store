import { Component, input, Self } from '@angular/core';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'lib-radio',
  templateUrl: './radio.component.html',
  imports: [MatRadioGroup, MatRadioButton, ReactiveFormsModule, NgForOf],
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent {
  listDeSelection = input.required<{libelle: string; code: string}[]>();
  preSelection = input.required<string>();
  isDisable = input.required<boolean>();

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
}
