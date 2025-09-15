import type { Meta, StoryObj } from '@storybook/angular';
import { AutocompleteComponent } from './autocomplete.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<AutocompleteComponent> = {
  component: AutocompleteComponent,
  title: 'AutocompleteComponent',
};
export default meta;
type Story = StoryObj<AutocompleteComponent>;

export const Primary: Story = {
  args: {
    appearance: 'outline',
    name: '',
    placeholder: '',
    label: '',
    isMultiSelect: false,
    options: [],
  },
};

export const Heading: Story = {
  args: {
    appearance: 'outline',
    name: '',
    placeholder: '',
    label: '',
    isMultiSelect: false,
    options: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/autocomplete works!/gi)).toBeTruthy();
  },
};
