import {
  AfterViewInit,
  Component,
  effect,
  inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ToDoEnumform, TodoForm, ToDoList } from '@stores/libs';
import { Subject, Subscription } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { TodoService } from '../../services/todo.service';
import { TodoListStore } from './todo-list-store/todo-list-store';
import { MatButton, MatIconButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss',
  imports: [
    MatIconModule,
    MatButton,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatSortHeader,
    MatHeaderCellDef,
    MatCellDef,
    MatIconButton,
    DatePipe,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatPaginator,
    MatIcon,
    MatCard,
    MatCardContent,
    MatCardHeader,
  ],
})
export class ToDoListComponent implements AfterViewInit, OnDestroy {
  dataSource: MatTableDataSource<ToDoList> = new MatTableDataSource<ToDoList>();
  private _liveAnnouncer = inject(LiveAnnouncer);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    ToDoEnumform.id,
    ToDoEnumform.status,
    ToDoEnumform.archiveMessage,
    ToDoEnumform.title,
    ToDoEnumform.message,
    ToDoEnumform.date,
    ToDoEnumform.action,
  ];
  protected pageSize: number[] = [5, 10, 25, 100];
  protected readonly ToDoEnumform = ToDoEnumform;
  protected readonly formatDate: string = 'dd-MM-YYYY';

  readonly service: FormService = inject(FormService);

  store = inject(TodoListStore);

  private subscribe$: Subscription = new Subscription();
  private subscribeDialog$: Subscription = new Subscription();
  private unsubscribe$ = new Subject<void>();
  todoFormService: TodoService = inject(TodoService);
  readonly dialog = inject(MatDialog);
  fb: FormBuilder = inject(FormBuilder);

  todoForm: FormGroup<TodoForm> = this.todoFormService.initializeForm();

  constructor() {
    effect(() => {
      setTimeout(() => {
        this.dataSource.data = [...this.store.list()];
      }, 4000);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  create(): void {
    const dialogRef = this.todoFormService.dialogManage();
    this.subscribeDialog$ = dialogRef.afterClosed().subscribe((result) => {
      if (result) this.store.create(result.data);
      this.todoForm.reset();
    });
  }

  edit(el: ToDoList): void {
    const dialogRef = this.todoFormService.dialogManage(el);
    this.subscribeDialog$ = dialogRef.afterClosed().subscribe((result) => {
      if (result) this.store.edit(result.data);
      this.todoForm.reset();
    });
  }

  showLine(element: ToDoList) {
    this.todoFormService.dialogManage(element, true);
  }

  removeLine(el: ToDoList) {
    this.store.delete(el);
  }

  deactiveTodo(el: ToDoList) {
    this.store.deactiv(el[ToDoEnumform.id]);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnDestroy() {
    this.subscribeDialog$.unsubscribe();
    this.subscribe$.unsubscribe();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log('Désinscription effectuée');
  }
}
