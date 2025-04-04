import {
  AfterViewInit,
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import {
  Direction,
  PeriodicElement,
  PeriodicElementEnum,
} from '../../models/table.interface';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, MatSortHeader, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-periodic-table',
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss',
  imports: [
    MatIconModule,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatSortHeader,
    MatCellDef,
    MatCell,
    MatRow,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator,
    MatIcon,
    MatCard,
    MatCardContent,
  ],
})
export class PeriodicTableComponent
  implements OnChanges, OnDestroy, AfterViewInit
{
  protected readonly PeriodicElementEnum = PeriodicElementEnum;

  @Input({ required: true }) list: Observable<PeriodicElement[]> =
    new Observable<PeriodicElement[]>();
  @Input({ required: true }) displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  dataSubject = new BehaviorSubject<PeriodicElement[]>([]);

  private _liveAnnouncer = inject(LiveAnnouncer);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private subscribe$: Subscription = new Subscription();
  private unsubscribe$ = new Subject<void>();
  protected pageSize: number[] = [5, 10, 25, 100];

  toto: Direction = 'Left';

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['list']) {
      this.subscribe$ = this.list.subscribe(
        (list) => (this.dataSource.data = list),
      );
    }
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnDestroy() {
    this.subscribe$.unsubscribe();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    console.log('Désinscription effectuée');
  }
}
