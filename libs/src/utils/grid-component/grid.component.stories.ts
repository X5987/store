import type { Meta, StoryObj } from '@storybook/angular';
import { GridComponent } from './grid.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<GridComponent> = {
  component: GridComponent,
  title: 'GridComponent',
};
export default meta;
type Story = StoryObj<GridComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/grid works!/gi)).toBeTruthy();
  },
};
