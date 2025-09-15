import type { Meta, StoryObj } from '@storybook/angular';
import { DialogTodoComponent } from './dialog-todo.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DialogTodoComponent> = {
  component: DialogTodoComponent,
  title: 'DialogTodoComponent',
};
export default meta;
type Story = StoryObj<DialogTodoComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/dialog-todo works!/gi)).toBeTruthy();
  },
};
