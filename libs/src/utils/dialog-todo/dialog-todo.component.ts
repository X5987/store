import {
  Component,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoDialog, ToDoEnumform, TodoForm } from '../../interfaces';
import { ValueChangesFormService } from '../../services/form-service/value-changes-form.service';
import {
  InputTextComponent,
  TextareaComponent,
} from '../../components/form-fields';

@Component({
  selector: 'lib-dialog-todo',
  imports: [
    CommonModule,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    InputTextComponent,
    TextareaComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-todo.component.html',
  styleUrl: './dialog-todo.component.scss',
})
export class DialogTodoComponent extends DialogComponent {
  dialogRef = inject(MatDialogRef<DialogComponent>);
  protected readonly ToDoEnumform = ToDoEnumform;

  readonly valueChangesService: ValueChangesFormService = inject(
    ValueChangesFormService,
  );
  readonly data: TodoDialog = inject<TodoDialog>(MAT_DIALOG_DATA);
  protected titleTodo: WritableSignal<string> = signal(this.data.title);
  protected inputLabel: WritableSignal<string> = signal(this.data.inputLabel);
  protected placeholder: WritableSignal<string> = signal(this.data.placeholder);
  protected closeLabel: WritableSignal<string> = signal(this.data.close);
  protected readonly: WritableSignal<boolean> = signal(this.data.readonly);
  protected save: WritableSignal<string> = signal(this.data.save);
  protected messageTitle: WritableSignal<string> = signal(
    this.data.messageTitle,
  );
  protected messagePlaceholder: WritableSignal<string> = signal(
    this.data.messagePlaceholder,
  );
  protected formReceived: FormGroup<TodoForm> = this.data.formValue;
  private initialFormValues = this.formReceived.getRawValue();

  get isFormChanged(): Signal<boolean> {
    return this.valueChangesService.valueChangeCheck(
      this.formReceived,
      this.initialFormValues,
    );
  }

  constructor() {
    super();
  }

  sendData() {
    const formData = this.data.formValue.value;
    this.dialogRef.close({ data: formData });
  }
}
