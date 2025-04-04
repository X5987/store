import { Injectable, signal, Signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValueChangesFormService {
  public valueChangeCheck(
    form: FormGroup,
    initialFormValues: object,
  ): Signal<boolean> {
    const isPristine =
      JSON.stringify(form.getRawValue()) === JSON.stringify(initialFormValues);
    if (isPristine) {
      form.markAsPristine();
    }
    return signal(!form.dirty);
  }
}
