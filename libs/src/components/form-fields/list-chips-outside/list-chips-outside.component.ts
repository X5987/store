import {
  Component,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  ChangeDetectorRef, OnInit
} from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BackoValidators } from '../../../../core/validators/validators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'bac-list-chips-outside',
  templateUrl: './list-chips-outside.component.html',
  styleUrls: ['./list-chips-outside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListChipsOutsideComponent implements OnInit{
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'outline';
  @Input() _formArrayName: string;
  @Input() _formGroup: FormGroup;
  inputControl: FormControl;
  @Input() label: string;
  @Input() typeError: string;
  @Input() labelPosition: 'inside' | 'above' = 'above';
  @Input() placeholder: string;
  @Input() type: 'email' | 'text' | 'number' | 'password';
  @Input() chipsPosition: 'inside' | 'outside' = 'inside';
  @Input() maxlength: number;
  @Input() backgroundColor: string;
  @Input() color = '#ffffff';
  @Input() customStyle: Object;
  @Output() removeTooltip = new EventEmitter<void>();
  removable = true;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private _ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.inputControl = new FormControl('', [BackoValidators.email, Validators.required, Validators.maxLength(70)])

    this._formGroup.get(this._formArrayName).valueChanges.subscribe(item => {
      if(this._formGroup.get(this._formArrayName).value.length === 0){
        this.inputControl.clearValidators();
        this.inputControl.setValidators([Validators.required, BackoValidators.email, Validators.maxLength(70)])
      } else {
        this.inputControl.clearValidators();
        this.inputControl.setValidators([BackoValidators.email, Validators.maxLength(70)]);
      }
      this.inputControl.updateValueAndValidity();
    });
  }

  get formArray(): UntypedFormArray {
    return this._formGroup.get(this._formArrayName) as UntypedFormArray;
  }

  add(event: any): void {
    if (!!event.value && !!event.value.replace(/\s/g, '').length) {
      const control = new UntypedFormControl(event.value, [
        BackoValidators.email,
        Validators.required,
      ]);
      control.markAsTouched();
      this.formArray.push(control);
    }
    event.setValue('');
  }

  remove(index: number) {
    this.formArray.removeAt(index);
  }

  get styleObject() {
    return {
      backgroundColor: `${this.backgroundColor}`,
      color: `${this.color}`,
      ...this.customStyle,
    };
  }

  get iconColor() {
    return {
      color: `${this.color}`,
    };
  }

  fixText(control: string, index: number, error: boolean) {
    if (error) {
      this.inputControl.setValue(control);
      this.formArray.removeAt(index);
    }
  }

}
