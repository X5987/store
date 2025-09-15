import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormGroup, Validators
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { InputTextComponent } from '@stores/libs';
import { userEvent, within } from '@storybook/testing-library';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



const meta: Meta<InputTextComponent> = {
  title: 'UI/InputText',
  component: InputTextComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatFormField,
        MatInput,
        MatIconButton,
        MatIcon,
      ],
    }),
  ],
  tags: ['autodocs'],
};

const renderFormTemplate = (args: any) => {
  const form = new FormGroup({
    nom: new FormControl({ value: '', disabled: args.disabled }),
  });
  return {
    props: {
      ...args,
      form,
      formControl: form.get('nom'),
    },
    template: `
          <lib-input-text
            [formControl]="formControl"
            [label]="label"
            [placeholder]="placeholder"
            [type]="type"
            [typePassword]="typePassword"
            [disabled]="disabled"
            [readonly]="readonly"
            (showText)="showTextEvent($event)"
          ></lib-input-text>
    `,
  };
};

export default meta;
type Story = StoryObj<InputTextComponent>;

export const Default: Story = {
  render: renderFormTemplate,
  args: {
    type: 'text',
    label: 'Non',
    placeholder: 'Entrez votre nom',
    disabled: false,
    icon: 'close',
    typePassword: false,
    readonly: false,
  },
};

export const Password: Story = {
  render: renderFormTemplate,
  args: {
    label: 'Mot de passe',
    placeholder: 'Entrez votre Mot de passe',
    type: 'password',
    typePassword: true,
  }
};


export const InputError: Story = {
  render: renderFormTemplate,
  args: {
    type: 'text',
    label: 'Non',
    placeholder: 'Entrez votre nom',
    typePassword: false,
    control: (() => {
      const control = new FormControl('', [Validators.required, Validators.maxLength(10)]); // Ajouter un validateur
      control.markAsTouched(); // Marquer comme touché pour afficher l'erreur
      control.setErrors({ required: true }); // Forcer l'état invalide
      return control;
    })()
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('This field is required')).toBeTruthy();
  },
};


