import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService<T> {
  private formGroupSource = new BehaviorSubject<FormGroup | null>(null);

  constructor(private fb: FormBuilder) {
    this.formGroupSource.next(
      this.fb.group({
        name: [''],
        age: [''],
      }),
    );
  }

  setFormGroup(template: FormGroup<T>) {
    this.formGroupSource.next(template);
  }

  getFormGroup(): Observable<FormGroup | null> {
    return this.formGroupSource.asObservable();
  }
}
