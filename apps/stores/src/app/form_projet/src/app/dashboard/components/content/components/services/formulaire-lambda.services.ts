import { inject, Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Movie, MovieForm } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FormulaireLambdaServices {
  formBuilder = inject(FormBuilder);

  formulaireLambda(data?: Movie): FormGroup<MovieForm> {
    return this.formBuilder.group({
      id: new FormControl(data?.id || 0),
      title: new FormControl(data?.title || '', [Validators.required]),
      description: new FormControl(data?.description || '', [
        Validators.required,
      ]),
    }) as FormGroup<MovieForm>;
  }
}
