import { Component, input, output, Self } from '@angular/core';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'lib-slide-toggle',
    template: `<mat-slide-toggle
    [formControl]="control"
    (change)="switchChange($event)"
  >
  </mat-slide-toggle> `,
    imports: [ReactiveFormsModule, MatSlideToggle]
})
export class SlideToggleComponent {
  label = input.required<string>();
  readonly = input(false);
  changeValue = output<boolean>();

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  switchChange($event: MatSlideToggleChange) {
    this.changeValue.emit($event.checked);
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
