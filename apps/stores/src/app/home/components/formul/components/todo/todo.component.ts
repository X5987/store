import {
  Component,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

export interface Todo {
  id: number;
  message: string;
  complete: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  imports: [MatLabel, MatFormField, MatInput, MatButton, FormsModule],
})
export class TodoComponent {
  @Input({ required: true }) label: WritableSignal<string> = signal('');
  @Input({ required: true }) placeholder: WritableSignal<string> = signal('');
  @Input({ required: true }) buttonName: WritableSignal<string> = signal('');
  @Input({ required: true }) todoList: WritableSignal<Todo[]> = signal<Todo[]>(
    []
  );

  modeEdition: WritableSignal<boolean> = signal(false);
  todoCurrent: WritableSignal<Todo> = signal<Todo>({
    id: 0,
    message: '',
    complete: false,
  });

  todoFormat(id = 0, message = '', complete = false): Todo {
    return { id, message, complete };
  }

  removeInputText() {
    this.todoCurrent.set({ message: '', complete: false, id: 0 });
    this.modeEdition.set(false);
  }

  edit(value: string) {
    const index = this.todoList().findIndex((value: Todo) => {
      return value.id === this.todoCurrent().id;
    });
    this.todoList()[index] = this.todoFormat(
      this.todoCurrent().id,
      value
    );
    this.removeInputText();
    this.modeEdition.set(false);
  }

  add(value: string) {
    this.todoList().push(
      this.todoFormat(this.todoList().length + 1, value)
    );
    this.removeInputText();
  }
}
