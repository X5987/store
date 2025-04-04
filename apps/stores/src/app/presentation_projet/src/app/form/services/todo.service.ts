import { inject, Injectable } from '@angular/core';
import {
  DialogTodoComponent,
  TodoDialog,
  ToDoEnumform,
  ToDoList,
} from '@stores/libs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  fb: FormBuilder = inject(FormBuilder);
  readonly dialog = inject(MatDialog);
  protected enterAnimationDuration: string = '500ms';
  protected exitAnimationDuration: string = '100ms';

  initializeForm(element?: ToDoList, readonly = false) {
    const form: FormGroup = this.fb.group({
      [ToDoEnumform.id]: new FormControl({
        value: element?.[ToDoEnumform.id] ?? null,
        disabled: readonly,
      }),
      [ToDoEnumform.title]: new FormControl(
        {
          value: element?.[ToDoEnumform.title] ?? '',
          disabled: readonly,
        },
        [Validators.required],
      ),
      [ToDoEnumform.message]: new FormControl(
        {
          value: element?.[ToDoEnumform.message] ?? '',
          disabled: readonly,
        },
        [Validators.required],
      ),
      [ToDoEnumform.status]: new FormControl({
        value: element?.[ToDoEnumform.status] ?? false,
        disabled: readonly,
      }),
      [ToDoEnumform.date]: new FormControl({
        value: element?.[ToDoEnumform.date] ?? new Date(),
        disabled: readonly,
      }),
      [ToDoEnumform.archiveMessage]: new FormControl({
        value: element?.[ToDoEnumform.archiveMessage] ?? false,
        disabled: readonly,
      }),
    });
    return form;
  }

  dialogManage(element?: ToDoList, readonly = false) {
    const form = this.initializeForm(element, readonly);
    return this.dialog.open(DialogTodoComponent, {
      width: '650px',
      enterAnimationDuration: this.enterAnimationDuration,
      exitAnimationDuration: this.exitAnimationDuration,
      data: <TodoDialog>{
        readonly: readonly,
        title: 'Crée une toDo',
        inputLabel: 'Ajouter un titre',
        placeholder: 'Ex: Faire caca...',
        close: 'Fermer',
        save: !element ? 'Enregistrer' : 'Modifier',
        messageTitle: 'Votre message',
        messagePlaceholder: 'Ex: Je dois faire...',
        formValue: form,
      },
    });
  }
}
