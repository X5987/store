import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CheckBoxListComponent } from './check-box-list.component';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { within } from '@storybook/testing-library';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';

const meta: Meta<CheckBoxListComponent> = {
  title: 'UI/CheckBoxList',
  component: CheckBoxListComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
        MatFormFieldModule,

      ],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    listDeCheckbox: {
      control: 'object',
      description: 'List of checkbox items with libelle and code',
    },
    preSelection: {
      control: 'text',
      description: 'Pre-selected checkbox code',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all checkboxes',
    },
    control: {
      control: false, // Pas de contrôle direct pour FormControl
      description: 'FormControl instance for the checkbox list',
    },
  },
};

// Fonction renderTemplate pour centraliser le rendu
const renderTemplate = (args: any) => {
  const control = new FormControl(args.controlValue || args.preSelection || '');

  return {
    props: {
      ...args,
      control,
      onChange: (value: string | string[]) => {
        control.setValue(value); // Simuler les changements
      },
    },
    template: `
      <lib-check-box-list
        [listDeCheckbox]="listDeCheckbox"
        [preSelection]="preSelection"
        [disabled]="disabled"
        [formControl]="control"
      ></lib-check-box-list>
    `,
  };
};

export default meta;
type Story = StoryObj<CheckBoxListComponent>;

export const EmptyList: Story = {
  render: renderTemplate,
  args: {
    listDeCheckbox: [
      { libelle: 'Option 1', value: true, disabled: false  },
      { libelle: 'Option 2', value: false, disabled: false },
      { libelle: 'Option 3', value: false, disabled: false },
    ],
    preSelection: '',
    disabled: false,
  },
};

export const Default: Story = {
  render: renderTemplate,
  args: {
    listDeCheckbox: [
      { libelle: 'Option 1', value: false, disabled: false},
      { libelle: 'Option 2', value: false, disabled: false },
      { libelle: 'Option 3', value: false, disabled: false },
    ],
    preSelection: '',
    disabled: false,
  },
};

export const WithPreSelection: Story = {
  render: renderTemplate,
  args: {
    listDeCheckbox: [
      { libelle: 'Option 1', value: true, disabled: false  },
      { libelle: 'Option 2', value: true, disabled: false  },
      { libelle: 'Option 3', value: true, disabled: false },
    ],
    preSelection: 'opt2',
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByLabelText('Option 2');
    expect(checkbox).toBeChecked(); // Vérifie que la case est cochée
  },
};

export const Disabled: Story = {
  render: renderTemplate,
  args: {
    listDeCheckbox: [
      { libelle: 'Option 1', value: true, disabled: true },
      { libelle: 'Option 2', value: false, disabled: true },
      { libelle: 'Option 3', value: true, disabled: false },
      { libelle: 'Option 4', value: false, disabled: false },
    ],
    preSelection: '',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole('checkbox');
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeDisabled(); // Vérifie que toutes les cases sont désactivées
    });
  },
};

export const WithError: Story = {
  args: {
    listDeCheckbox: [
      { libelle: 'Option 1', value: false, disabled: false },
      { libelle: 'Option 2', value: false, disabled: false },
    ],
    preSelection: '',
    disabled: false,
  },
  render: (args) => {
    const control = new FormControl(null, [Validators.required]);
    return {
      props: { ...args, control },
      template: `
        <lib-check-box-list
          [listDeCheckbox]="listDeCheckbox"
          [preSelection]="preSelection"
          [disabled]="disabled"
          [formControl]="control"
        ></lib-check-box-list>
        <mat-error>Selection required</mat-error>
      `,
    };
  },
};
