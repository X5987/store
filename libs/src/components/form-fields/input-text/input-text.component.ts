import { Component, input, Optional, output, Self, signal } from '@angular/core';
import {
  FormControl,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  standalone:true,
  imports: [
    CommonModule,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatIconButton,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIcon,
  ],
})
export class InputTextComponent {
  appearance = input<'fill' | 'outline'>('outline');
  label = input.required<string>();
  placeholder = input<string>('');
  id = input<string>('');
  type = input<string>('');
  typePassword = input<boolean>(false);
  readonly = input<boolean>(false);
  min = input<number>(0);
  max = input<number>(0);
  minlength = input<number>(0);
  maxlength = input<number>(0);
  upperCaseActive = input<boolean>(false);
  specialCharOmit = input<boolean>(false);
  showText = output<boolean>();
  stateShowText = signal(false);
  icon = input<string>('close');
  hidden = input<boolean>(false);

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

  clear() {
    this.control.disable({ emitEvent: false });
    this.control.setValue('', { emitEvent: false });
    setTimeout(() => {
      this.control.enable();
    });
  }

  showPassword() {
    this.stateShowText.set(!this.stateShowText());
    this.showText.emit(!this.stateShowText());
  }

  getErrorMessage(): string {
    const errors = this.control.errors;
    if (!errors) return '';
    if (errors['required']) return `${this.label()} est requis`;
    if (errors['minlength']) return `Le nombre minimum est ${errors['minlength'].requiredLength}`;
    if (errors['maxlength']) return `Le nombre maximum ${errors['maxlength'].requiredLength} est atteint`;
    if (errors['min']) return `Le nombre minimum est ${errors['min'].min}`;
    if (errors['max']) return `Le nombre maximum ${errors['max'].max} est atteint`;
    if (errors['duplicate']) return 'Cette valeur est dupliquée';
    if (errors['decimaleMax']) return 'Valeur décimale maximale atteinte';
    if (errors['entier']) return 'Valeur entière requise';
    if (errors['compareThreeElementNumber']) return 'Erreur de comparaison entre trois éléments';
    if (errors['tooLargeToTheNumbertOfDefault']) return 'Valeur trop grande par rapport au nombre par défaut';
    if (errors['smallerThanTheDefaultNumber']) return 'Valeur trop petite par rapport au nombre par défaut';
    if (errors['biggerThanTheDefaultNumber']) return 'Valeur trop grande par rapport au nombre par défaut';
    if (errors['email']) return 'Format d’email invalide';
    if (errors['emailNotAllowed']) return 'Email non valide';
    if (errors['whitespace']) return 'Le champ ne peut pas être vide ou contenir uniquement des espaces';
    return 'Erreur inconnue';
  }
}
