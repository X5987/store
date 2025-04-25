import { ChangeDetectionStrategy, Component, input, Self } from '@angular/core';
import { FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-check-box-list',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckBoxListComponent {
  listDeCheckbox = input.required<{ libelle: string; code: string }[] | { libelle: string; code: string }>();
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
