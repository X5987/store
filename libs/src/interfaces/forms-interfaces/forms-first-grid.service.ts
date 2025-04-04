import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { inject, Injectable } from '@angular/core';
import { DashboardValidators } from '../../services/validators/dashboard-validators.service';
import { AutoCompleteList } from '../../components/form-fields';

export interface FormModel {
  country: FormControl<string | null>;
  surname?: FormControl<string | null>;
  email: FormControl<string | null>;
  name: FormControl<string | null>;
  age: FormControl<number | null>;
}

export interface FormSecondModel {
  marques: FormControl<AutoCompleteList[] | null>;
}
@Injectable({
  providedIn: 'root',
})
export class FormService {
  formBuilder: FormBuilder = inject(FormBuilder);
  dashboardValidators: DashboardValidators = inject(DashboardValidators);

  createFormGroup(): FormGroup<FormModel> {
    return this.formBuilder.group<FormModel>({
      name: new FormControl<string | null>('', [
        Validators.required,
        this.dashboardValidators.whiteSpace(),
        Validators.maxLength(20),
      ]),
      email: new FormControl<string | null>(
        'allowed@example.com',
        [
          Validators.email,
          Validators.required,
          this.dashboardValidators.whiteSpace(),
        ],
        [this.dashboardValidators.validateEmail()],
      ),
      // surname: new FormControl<string | null>('', [Validators.maxLength(20)]),
      age: new FormControl<number | null>(18, [
        Validators.required,
        this.dashboardValidators.decimaleMax(3),
        Validators.min(18),
        Validators.max(20),
      ]),
      country: new FormControl<string | null>('France', [Validators.required]),
    });
  }

  createSecondFormGroup(): FormGroup<FormSecondModel> {
    return this.formBuilder.group<FormSecondModel>({
      marques: new FormControl<AutoCompleteList[] | null>(
        [
          { code: '005', libelle: 'TOTO' },
          { code: '005', libelle: 'Sony' },
          { code: '006', libelle: 'Microsoft' },
        ],
        [Validators.required],
      ),
    });
  }
}
