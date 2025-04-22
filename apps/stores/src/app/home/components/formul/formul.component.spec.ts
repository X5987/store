import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormulComponent } from './formul.component';
import { FormService, FormModel, FormSecondModel, AutoCompleteList } from '@stores/libs';
import { FormulService } from '../../services/formul.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotifService } from '@stores/libs';
import { ActivatedRoute } from '@angular/router';

describe('FormulComponent', () => {
  let component: FormulComponent;
  let fixture: ComponentFixture<FormulComponent>;
  let mockFormService: jest.Mocked<FormService>;
  let mockFormulService: jest.Mocked<FormulService>;
  let mockNotifService: jest.Mocked<NotifService>;

  beforeEach(async () => {
    mockFormService = {
      createFormGroup: jest.fn().mockReturnValue(
        new FormGroup<FormModel>({
          name: new FormControl<string | null>(null),
          email: new FormControl<string | null>(null),
          age: new FormControl<number | null>(null),
          country: new FormControl<any>(null),
        })
      ),
      createSecondFormGroup: jest.fn().mockReturnValue(new FormGroup({ marques: new FormControl([]) })),
    } as any;

    mockFormulService = {
      getListCountry: jest.fn().mockReturnValue(of([{ libelle: 'France' }])),
      getListBrand: jest.fn().mockReturnValue(of([{ libelle: 'Brand1' }])),
      getAllUser: jest.fn().mockReturnValue(of([{ name: 'User1' }])),
      getListTodo: jest.fn().mockReturnValue(of([{ id: 1, message: 'Todo1', complete: false }])),
    } as any;

    mockNotifService = {
      openNotif: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [FormulComponent, ReactiveFormsModule, MatSnackBarModule],
      providers: [
        { provide: FormService, useValue: mockFormService },
        { provide: FormulService, useValue: mockFormulService },
        { provide: NotifService, useValue: mockNotifService },
        { provide: ActivatedRoute, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FormulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Tests inchangés
  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('initializes form groups', () => {
      expect(component.formGroupSource).toBeTruthy();
      expect(component.formSecondGroupSource).toBeTruthy();
    });

    it('sets tile contexts on init', () => {
      expect(component.tilesForms().tile[0].context).toBe(component.formTemplate);
      expect(component.tilesForms().tile[4].context).toBe(component.formSecondTemplate);
      expect(component.tilesForms().tile[2].context).toBe(component.formThirdTemplate);
      expect(component.tilesForms().tile[5].context).toBe(component.formThirdResultTemplate);
    });

    it('loads todo list', () => {
      expect(component.arrayListTodo.value).toEqual([{ id: 1, message: 'Todo1', complete: false }]);
    });
  });

  describe('Form Submission', () => {
     // it('sends first form and resets', () => {
     //   component.formGroupSource.setValue(
     //     { name: 'Julie', email: 'allowed@example.com', age: 18, country: 'France' },
     //     { emitEvent: false }
     //   );
     //   component.sentFirstForm();
     //   expect(component.tilesForms().tile[3].context).toBe(component.formFirstResultTemplate);
     //   expect(component.tilesForms().tile[3].data).toEqual({ name: 'Julie', email: 'allowed@example.com', age: 18, country: 'France' });
     // });

    it('sends second form and resets', () => {
      const mockAutocomplete = { itemsSelected: { set: jest.fn() } } as any;
      component.autocompleteMarque = mockAutocomplete;
      const marqueValue: AutoCompleteList[] = [{ libelle: 'Brand1', code: 'BRAND1' }];
      component.formSecondGroupSource.setValue({ marques: marqueValue });
      component.sentSecondForm();
      expect(component.tilesForms().tile[1].context).toBe(component.formSecondResultTemplate);
      expect(component.tilesForms().tile[1].data).toEqual({ marques: [{ libelle: 'Brand1', code: 'BRAND1' }] });
      expect(mockAutocomplete.itemsSelected.set).toHaveBeenCalledWith([]);
    });
  });

  describe('Todo Interactions', () => {
    it('toggles todo completion', () => {
      const todo = { id: 1, message: 'Todo1', complete: false };
      component.arrayListTodo.next([todo]);
      component.changeTodo(todo);
      expect(todo.complete).toBe(true);
      expect(component.tilesForms().tile[2].data).toBe(component.formThirdResultTemplate);
    });

    it('edits todo text', () => {
      const todo = { id: 1, message: 'Todo1', complete: false };
      component.appTodo = { modeEdition: signal(false), todoCurrent: { value: { id: 0, message: '' } } } as any;
      jest.spyOn(component.renderer, 'selectRootElement').mockReturnValue({ focus: jest.fn() } as any);
      component.changeTodoText(todo);
      expect(component.appTodo.modeEdition()).toBe(true);
      expect(component.appTodo.todoCurrent.value).toEqual({ id: 1, message: 'Todo1' });
    });

    it('removes todo and shows notification', () => {
      component.appTodo = { removeInputText: jest.fn() } as any;
      component.arrayListTodo.next([{ id: 1, message: 'Todo1', complete: false }, { id: 2, message: 'Todo2', complete: false }]);
      component.removeTodo(0);
      expect(component.arrayListTodo.value).toEqual([{ id: 2, message: 'Todo2', complete: false }]);
      expect(mockNotifService.openNotif).toHaveBeenCalled();
      expect(component.loading.value).toBe(false);
      expect(component.appTodo.removeInputText).toHaveBeenCalled();
    });
  });

  describe('Sorting', () => {
    it('sorts todos by message', () => {
      const todos = [
        { id: 1, message: 'Zebra', complete: false },
        { id: 2, message: 'Apple', complete: true },
      ];
      component.arrayListTodo.next(todos);
      component.sortData({ active: 'message', direction: 'asc' });
      expect(component.arrayListTodo.value).toEqual([
        { id: 2, message: 'Apple', complete: true },
        { id: 1, message: 'Zebra', complete: false },
      ]);
    });
  });

  describe('Cleanup', () => {
    it('unsubscribes on destroy', () => {
      jest.spyOn(component.loading, 'unsubscribe');
      jest.spyOn(component.arrayListTodo, 'unsubscribe');
      component.ngOnDestroy();
      expect(component.loading.unsubscribe).toHaveBeenCalled();
      expect(component.arrayListTodo.unsubscribe).toHaveBeenCalled();
    });
  });
});
