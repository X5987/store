import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { delay, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardValidators {
  whiteSpace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasInnerSpaces = /\s+/.test(control.value || '');
      const isWhitespace = (control.value || '').trim().length === 0;
      const isValid = !isWhitespace && !hasInnerSpaces;
      return isValid ? null : { whitespace: true };
    };
  }

  decimaleMax(decimalMax: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null; // Vide retourne null // Regex vérifie les chiffres avec un maximum de 'decimalMax' décimales
      const valid = new RegExp(`^[0-9]+([.,][0-9]{1,${decimalMax}})?$`).test(
        value,
      );
      return valid ? null : { decimaleMax: true };
    };
  }

  private allowedEmails = of(['allowed@example.com', 'test@domain.com']);

  validateEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);
      return this.allowedEmails.pipe(
        delay(2000),
        map((allowedEmails) => {
          return allowedEmails.includes(control.value)
            ? null
            : { emailNotAllowed: true };
        }),
      );
    };
  }
}
