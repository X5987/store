// apps/stores/src/app/todo/todo.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent, Todo } from './todo.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TodoComponent,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    component.label = signal('Todo Label');
    component.placeholder = signal('Enter a todo');
    component.buttonName = signal('Ajouter');
    component.todoList = signal<Todo[]>([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial form state', () => {
    const formField = fixture.debugElement.nativeElement.querySelector('#form-third');
    const input = fixture.debugElement.nativeElement.querySelector('#inputMessage');
    const saveButton = fixture.debugElement.nativeElement.querySelector('#save');

    expect(formField).toBeTruthy();
    expect(input).toBeTruthy();
    expect(input.value).toBe('');
    expect(saveButton).toBeTruthy();
    expect(saveButton.disabled).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('#edit')).toBeNull();
    expect(fixture.debugElement.nativeElement.querySelector('#cancel')).toBeNull();
  });

  it('should enable save button when input has value', () => {
    const input = fixture.debugElement.nativeElement.querySelector('#inputMessage');
    const saveButton = fixture.debugElement.nativeElement.querySelector('#save');

    input.value = 'Faire les courses';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(saveButton.disabled).toBeFalsy();
  });

  it('should clear input and reset modeEdition with removeInputText', () => {
    component.todoCurrent.set({ id: 1, message: 'Faire les courses', complete: false });
    component.modeEdition.set(true);
    fixture.detectChanges();

    const input = fixture.debugElement.nativeElement.querySelector('#inputMessage');
    expect(input.value).toBe('Faire les courses');
    expect(component.modeEdition()).toBeTruthy();

    component.removeInputText();
    fixture.detectChanges();

    expect(component.todoCurrent().message).toBe('');
    expect(component.todoCurrent().id).toBe(0);
    expect(component.todoCurrent().complete).toBeFalsy();
    expect(component.modeEdition()).toBeFalsy();
  });

  it('should add a todo and call removeInputText', () => {
    const input = fixture.debugElement.nativeElement.querySelector('#inputMessage');
    const saveButton = fixture.debugElement.nativeElement.querySelector('#save');

    input.value = 'Faire les courses';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    saveButton.click();
    fixture.detectChanges();
    expect(component.todoList()).toEqual([{ id: 1, message: 'Faire les courses', complete: false }]);

    expect(component.todoCurrent().message).toBe('');
    expect(component.todoCurrent().id).toBe(0);
    expect(component.modeEdition()).toBeFalsy();
  });

  // Test spécifique pour edit
  it('should edit a todo and call removeInputText', () => {
    component.todoList.set([{ id: 1, message: 'Faire les courses', complete: false }]);
    component.todoCurrent.set({ id: 1, message: 'Faire les courses', complete: false });
    component.modeEdition.set(true);
    fixture.detectChanges();

    const input = fixture.debugElement.nativeElement.querySelector('#inputMessage');
    const editButton = fixture.debugElement.nativeElement.querySelector('#edit');

    // Simuler une modification
    input.value = 'Faire le ménage';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Appeler edit via le bouton
    editButton.click();
    fixture.detectChanges();

    // Vérifier que le todo est mis à jour
    expect(component.todoList()).toEqual([{ id: 1, message: 'Faire le ménage', complete: false }]);

    // Vérifier que removeInputText a été appelé (via ses effets)
    expect(component.todoCurrent().message).toBe('');
    expect(component.todoCurrent().id).toBe(0);
    expect(component.modeEdition()).toBeFalsy();
  });
});
