import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import {
  FilterTableComponent,
  HeaderComponent,
  User,
  UserElementHeadTab,
  UserEnum,
} from '@stores/libs';
import {
  BehaviorSubject,
  Observable,
  Subject,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { FormService } from './services/form.service';
import {
  PeriodicElement,
  PeriodicElementEnum,
  PeriodicElementHeadTab,
} from './models/table.interface';
import { PeriodicTableComponent } from './components/periodic-table/periodic-table.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from './services/filter.service';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSuffix } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TablesStore } from './stores/tables-store';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  imports: [
    PeriodicTableComponent,
    UserTableComponent,
    ToDoListComponent,
    FilterTableComponent,
    MatSlideToggle,
    MatSuffix,
    FormsModule,
    HeaderComponent,
  ],
})
export class FormComponent implements OnInit, OnDestroy {
  filterPeriodic_appearance: 'fill' | 'outline' = 'outline';
  filterPeriodic_name = 'Filter';
  filterPeriodic_placeholder = 'filtre ça pédale';
  filterPeriodic_label = 'Filtre periodic';

  filterUser_appearance: 'fill' | 'outline' = 'outline';
  filterUser_name = 'Filter';
  filterUser_placeholder = 'filtre ça pédale';
  filterUser_label = 'Filtre user';

  protected readonly router: ActivatedRoute = inject(ActivatedRoute);
  protected readonly serviceForm: FormService = inject(FormService);
  protected filterService: FilterService = inject(FilterService);
  protected listColumns: string[] = PeriodicElementHeadTab;
  protected listUserDisplayColumn: string[] = UserElementHeadTab;

  protected listTable$: Observable<PeriodicElement[]> = new Observable<
    PeriodicElement[]
  >();
  protected listUser = signal([] as User[]);
  private unsubscribe$ = new Subject<void>();

  protected checkbox = false;

  private filterTextSubject = new BehaviorSubject<string>('');
  private filterTextUserSubject = new BehaviorSubject<string>('');
  private toggleStatusSubject = new BehaviorSubject<boolean>(false);

  ngOnInit() {
    this.router.data
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((data) => {
          if (data) {
            this.listTable$ = data['data'].listPeriodic;
            this.listUser = data['data'].listUsers;
            this.listTable$ = this.filterService.filterList(
              this.serviceForm.getElementPeriodic(),
              this.filterTextSubject,
              (item: PeriodicElement, text: string, toggle?: boolean) =>
                (item[PeriodicElementEnum.name]
                  .toLowerCase()
                  .includes(text.toLowerCase()) ||
                  item[PeriodicElementEnum.position]
                    .toString()
                    .includes(text.toLowerCase()) ||
                  item[PeriodicElementEnum.weight]
                    .toString()
                    .includes(text.toLowerCase()) ||
                  item[PeriodicElementEnum.symbol]
                    .toLowerCase()
                    .includes(text.toLowerCase())) &&
                (!item[PeriodicElementEnum.active]
                  ? item.active === toggle
                  : item.active),
              this.toggleStatusSubject
            );
            this.filterService
              .filterList(
                this.serviceForm.getAllUsers(),
                this.filterTextUserSubject,
                (item: User, text: string) =>
                  item[UserEnum.username].includes(text.toLowerCase()) ||
                  item[UserEnum.password].includes(text.toLowerCase())
              )
              .subscribe((list) => {
                this.listUser.set(list);
              });
          }
        })
      )
      .subscribe();
  }

  filterText(filterText: string) {
    this.filterTextSubject.next(filterText);
  }

  filterTextUser(filterText: string) {
    this.filterTextUserSubject.next(filterText);
  }

  toggleStatus(statut: boolean) {
    this.toggleStatusSubject.next(statut);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  protected readonly timer = timer;
}
