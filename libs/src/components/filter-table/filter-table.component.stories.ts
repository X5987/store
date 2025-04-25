import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FilterTableComponent } from './filter-table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { within, userEvent } from '@storybook/testing-library';

const meta: Meta<FilterTableComponent> = {
  title: 'UI/FilterTable',
  component: FilterTableComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
    }),
  ],
  tags: ['autodocs'],
};

// Fonction renderTemplate pour centraliser le rendu
const renderTemplate = (args: any) => {
  return {
    props: {
      ...args,
      filterValue: args.filterValue || '', // Assurer que filterValue est toujours défini
    },
    template: `
      <lib-filter-table
        [name]="name"
        [placeholder]="placeholder"
        [label]="label"
        [inputPlaceholder]="inputPlaceholder"
        [appearance]="appearance"
        [(filterValue)]="filterValue"
        (textfilter)="textfilter($event)"
      >
      </lib-filter-table>
    `,
  };
};

export default meta;
type Story = StoryObj<FilterTableComponent>;

export const Default: Story = {
  render: renderTemplate,
  args: {
    name: 'filter',
    placeholder: 'Filter items',
    label: 'Filter',
    inputPlaceholder: 'Ex: Carbon',
    appearance: 'outline',
    filterValue: '',
  },
};

export const WithValue: Story = {
  render: renderTemplate,
  args: {
    name: 'filter',
    placeholder: 'Filter items',
    label: 'Filter',
    inputPlaceholder: 'Ex: Carbon',
    appearance: 'outline',
    filterValue: 'Carbon',
  },
};

export const WithClearButton: Story = {
  render: renderTemplate,
  args: {
    name: 'filter',
    placeholder: 'Filter items',
    label: 'Filter',
    inputPlaceholder: 'Ex: Carbon',
    appearance: 'outline',
    filterValue: 'Test Filter',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const clearButton = canvas.getByLabelText('Clear');
    expect(clearButton).toBeTruthy(); // Vérifie que le bouton est visible
    await userEvent.click(clearButton);
    expect(canvas.getByRole('textbox')).toHaveValue(''); // Vérifie que le champ est vide
  },
};

export const WithFillAppearance: Story = {
  render: renderTemplate,
  args: {
    name: 'filter',
    placeholder: 'Filter items',
    label: 'Filter',
    inputPlaceholder: 'Ex: Carbon',
    appearance: 'fill',
    filterValue: '',
  },
};
