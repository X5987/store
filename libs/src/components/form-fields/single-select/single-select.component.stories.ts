import type { Meta, StoryObj } from '@storybook/angular';
import { SingleSelectComponent } from './single-select.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SingleSelectComponent> = {
  component: SingleSelectComponent,
  title: 'SingleSelectComponent',
};
export default meta;
type Story = StoryObj<SingleSelectComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/single-select works!/gi)).toBeTruthy();
  },
};
