import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormArray, UntypedFormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { BackoValidators } from '../../../../core/validators/validators';

@Component({
  selector: 'bac-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipListComponent {
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'outline';
  @Input() _formArrayName: string;
  @Input() _formGroup: UntypedFormGroup;
  @Input() label: string;
  @Input() labelPosition: 'inside' | 'above' = 'above';
  @Input() placeholder: string;
  @Input() type: 'email' | 'text' | 'number' | 'password';
  @Input() chipsPosition: 'inside' | 'outside' = 'inside';
  @Input() backgroundColor: string;
  @Input() color = '#ffffff';
  @Input() customStyle: Object;
  @Input() validatorOrNOt: boolean = true;
  @Output() removeTooltip = new EventEmitter<void>();
  removable = true;
  separators = [ENTER, COMMA];

  constructor(private  _ref: ChangeDetectorRef) {
  }

  get formArray(): UntypedFormArray {
    return this._formGroup.get(this._formArrayName) as UntypedFormArray;
  }

  add(event: any): void {
    if (!!event.value && !!event.value.replace(/\s/g, '').length) {
      const control = new UntypedFormControl(event.value,
        this.validatorOrNOt ? [BackoValidators.email, BackoValidators.required] : []);
      control.markAsTouched();
      this.formArray.push(control);
    }
    event.input.value = '';
  }

  remove(index: number) {
    this.formArray.removeAt(index);
  }

  get styleObject() {
    return {
      backgroundColor: `${this.backgroundColor}`,
      color: `${this.color}`,
      ...this.customStyle
    };
  }

  get iconColor() {
    return {
      color: `${this.color}`
    };
  }
}
