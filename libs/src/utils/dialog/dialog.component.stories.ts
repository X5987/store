import type { Meta, StoryObj } from '@storybook/angular';
import { DialogComponent } from './dialog.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DialogComponent> = {
  component: DialogComponent,
  title: 'DialogComponent',
};
export default meta;
type Story = StoryObj<DialogComponent>;

export const Primary: Story = {
  args: {
    title: '',
    texte: '',
    close: 'Close',
    valide: 'Valide',
  },
};

export const Heading: Story = {
  args: {
    title: '',
    texte: '',
    close: 'Close',
    valide: 'Valide',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dialog works!/gi)).toBeTruthy();
  },
};
