import type { Meta, StoryObj } from '@storybook/angular';
import { NotifComponent } from './notif.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<NotifComponent> = {
  component: NotifComponent,
  title: 'NotifComponent',
};
export default meta;
type Story = StoryObj<NotifComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/notif works!/gi)).toBeTruthy();
  },
};
