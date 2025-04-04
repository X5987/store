import {
  Component,
  TemplateRef,
  ViewChild,
  OnInit,
  inject,
  Signal,
  model,
  ElementRef,
  signal,
  Renderer2,
  OnDestroy,
} from '@angular/core';
import {
  AutocompleteComponent,
  AutoCompleteList,
  FormModel,
  FormSecondModel,
  FormService,
  GridComponent,
  GridStructur,
  InputTextComponent,
  ListSelect,
  LoaderSimpleDirective,
  NotifService,
  SingleSelectComponent,
  TileTypeEnum,
  UserWithoutAdress,
} from '@stores/libs';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { FormulService } from '../../services/formul.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Todo, TodoComponent } from './components/todo/todo.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatList, MatListItem } from '@angular/material/list';
import { AsyncPipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DestroySubscribes } from '../../../../../../../libs/src/services/destroy/destroy-subscribes';

@Component({
  selector: 'app-formul',
  imports: [
    GridComponent,
    AutocompleteComponent,
    TodoComponent,
    MatCheckbox,
    MatSortModule,
    SingleSelectComponent,
    InputTextComponent,
    MatChipSet,
    MatChip,
    MatList,
    AsyncPipe,
    MatListItem,
    MatIconButton,
    MatIcon,
    ReactiveFormsModule,
    MatButton,
    LoaderSimpleDirective,
  ],
  templateUrl: './formul.component.html',
  styleUrls: ['./formul.component.scss'],
})
export class FormulComponent implements OnInit, OnDestroy {
  tilesForms: Signal<GridStructur> = signal({
    grid: {
      cols: 3,
      rowHeight: 400,
      gutterSize: 40,
    },
    tile: [
      {
        text: 'form1',
        cols: 4,
        rows: 1,
        context: null,
      },
      {
        text: 'form2Result',
        cols: 4,
        rows: 1,
        context: null,
      },

      {
        text: 'form3',
        cols: 4,
        rows: 1,
        context: null,
      },
      {
        text: 'form1Result',
        cols: 4,
        rows: 2,
        context: null,
      },
      {
        text: 'form2',
        cols: 4,
        rows: 2,
      },
      {
        text: 'form3Result',
        cols: 4,
        rows: 2,
        context: null,
      },
    ],
  });
  protected readonly TileTypeEnum = TileTypeEnum;
  @ViewChild('formTemplate', { static: true })
  formTemplate!: TemplateRef<never>;

  @ViewChild('formSecondTemplate', { static: true })
  formSecondTemplate!: TemplateRef<never>;

  @ViewChild('formThirdTemplate', { static: true })
  formThirdTemplate!: TemplateRef<never>;

  @ViewChild('formSecondResultTemplate', { static: true })
  formSecondResultTemplate!: TemplateRef<never>;

  @ViewChild('formThirdResultTemplate', { static: true })
  formThirdResultTemplate!: TemplateRef<never>;

  @ViewChild('formFirstResultTemplate', { static: true })
  formFirstResultTemplate!: TemplateRef<never>;

  @ViewChild('autocompleteMarque', { static: false })
  autocompleteMarque!: AutocompleteComponent;

  @ViewChild('appTodo', { static: false })
  appTodo!: TodoComponent;

  serviceList: FormulService = inject(FormulService);
  formService: FormService = inject(FormService);
  renderer: Renderer2 = inject(Renderer2);
  el: ElementRef = inject(ElementRef);
  notifService: NotifService = inject(NotifService);

  formGroupSource: FormGroup<FormModel> = this.formService.createFormGroup();
  formSecondGroupSource: FormGroup<FormSecondModel> =
    this.formService.createSecondFormGroup();
  listCountry$: Observable<ListSelect[]> =
    this.serviceList.getListCountry() as Observable<ListSelect[]>;
  list: Signal<AutoCompleteList[]> = toSignal(this.serviceList.getListBrand(), {
    initialValue: [],
  });

  userWithoutAdress$: Observable<UserWithoutAdress[]> = new Observable<
    UserWithoutAdress[]
  >();

  protected readonly todoPlaceholder: Signal<string> =
    model('Ex: faire ceci...');
  protected readonly todoLabel: Signal<string> = model('Ajouter une todo');
  protected readonly todoButtonName: Signal<string> = model('Ajouter');

  arrayListTodo: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  protected readonly router: ActivatedRoute = inject(ActivatedRoute);
  protected readonly destroySubs: DestroySubscribes = inject(DestroySubscribes);

  ngOnInit(): void {
    if (this.formTemplate) {
      this.tilesForms().tile[0].context = this.formTemplate;
      this.tilesForms().tile[4].context = this.formSecondTemplate;
      this.tilesForms().tile[2].context = this.formThirdTemplate;
      this.tilesForms().tile[5].context = this.formThirdResultTemplate;
    }
    this.userWithoutAdress$ = this.serviceList.getAllUser();

    this.serviceList
      .getListTodo()
      .pipe(map((list: Todo[]) => this.arrayListTodo.next(list)))
      .subscribe();
  }

  sortData(sort: Sort) {
    const data = this.arrayListTodo.value.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.arrayListTodo.next(
      data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'id':
            return this.compare(a.id, b.id, isAsc);
          case 'message':
            return this.compare(a.message, b.message, isAsc);
          case 'complete':
            return this.compare(a.complete, b.complete, isAsc);
          default:
            return 0;
        }
      }),
    );
  }

  compare(
    a: number | string | boolean,
    b: number | string | boolean,
    isAsc: boolean,
  ) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sentFirstForm() {
    //  allowed@example.com | test@domain.com
    this.tilesForms().tile[3].context = this.formFirstResultTemplate;
    this.tilesForms().tile[3].data = this.formGroupSource.value;
    this.formGroupSource = this.formService.createFormGroup();
  }

  sentSecondForm() {
    this.tilesForms().tile[1].context = this.formSecondResultTemplate;
    this.tilesForms().tile[1].data = this.formSecondGroupSource.value;
    this.autocompleteMarque.itemsSelected.set([]);
    console.table(this.formSecondGroupSource.controls.marques.value);
    this.formSecondGroupSource.reset();
  }

  changeTodo(todo: Todo) {
    this.tilesForms().tile[2].data = this.formThirdResultTemplate;
    todo.complete = !todo.complete;
  }

  changeTodoText(todo: Todo) {
    this.renderer
      .selectRootElement(this.el.nativeElement.querySelector('#inputMessage'))
      .focus();

    this.appTodo.modeEdition = signal(true);
    this.appTodo.todoCurrent.value.id = todo.id;
    this.appTodo.todoCurrent.value.message = todo.message;
  }

  removeTodo(todoCurrent: number) {
    const config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'center',
      data: {
        message: 'Todo bien éffacé !',
        action: 'close',
        classe: 'snackbar-success',
      },
      panelClass: 'snackbar-success',
    };
    this.loading.next(true);
    const updatedList = this.arrayListTodo.value.filter(
      (todo, index) => index !== todoCurrent,
    );
    this.arrayListTodo.next(updatedList);
    this.notifService.openNotif(config.data, config);
    this.loading.next(false);
    this.appTodo.removeInputText();
  }

  ngOnDestroy() {
    this.loading.unsubscribe();
    this.arrayListTodo.unsubscribe();
  }
}
