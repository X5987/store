import { ChangeDetectionStrategy, Component, input, Self } from '@angular/core';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'lib-check-box-list',
  templateUrl: 'check-box-list.component.html',
  styleUrls: ['check-box-list.component.scss'],
  imports: [ReactiveFormsModule, MatCheckbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckBoxListComponent {
  listDeCheckbox = input.required<
    { libelle: string; value: boolean; disabled: boolean }[]
  >();
  preSelection = input.required<string>();
  disabled = input<boolean>(false);

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
