import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { BehaviorSubject, map, Subject } from 'rxjs';
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
export class TodoComponent implements OnInit, OnDestroy {
  @Input({ required: true }) label: Signal<string> = signal('');
  @Input({ required: true }) placeholder: Signal<string> = signal('');
  @Input({ required: true }) buttonName: Signal<string> = signal('');
  @Input({ required: true }) arrayListTodo: BehaviorSubject<Todo[]> =
    new BehaviorSubject<Todo[]>([]);
  modeEdition: Signal<boolean> = signal(false);

  protected add$: Subject<string> = new Subject<string>();
  protected edit$: Subject<string> = new Subject<string>();

  todoCurrent: BehaviorSubject<Todo> = new BehaviorSubject<Todo>({
    id: 0,
    message: '',
    complete: false,
  });

  ngOnInit(): void {
    this.add$
      .pipe(
        map((text: string) => {
          if (text) {
            const id: number = (this.arrayListTodo.value.length + 1) as number;
            this.arrayListTodo.value.push(this.todoFormat(id, text));
            this.removeInputText();
          }
        }),
      )
      .subscribe();

    this.edit$
      .pipe(
        map((newText: string) => {
          if (newText) {
            const index = this.arrayListTodo.value.findIndex((value: Todo) => {
              return value.id === this.todoCurrent.value.id;
            });
            this.arrayListTodo.value[index] = this.todoFormat(
              this.todoCurrent.value.id,
              newText,
            );
            this.removeInputText();
            this.modeEdition = signal(false);
          }
        }),
      )
      .subscribe();
  }

  todoFormat(id: number = 0, message: string, complete: boolean = false): Todo {
    return { id, message, complete };
  }

  removeInputText() {
    this.todoCurrent.value.message = '';
    this.modeEdition = signal(false);
  }

  ngOnDestroy() {
    this.add$.unsubscribe();
    this.edit$.unsubscribe();
  }
}
