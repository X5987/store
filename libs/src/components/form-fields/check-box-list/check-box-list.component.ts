import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  takeUntil,
} from 'rxjs/operators';

@Component({
  selector: 'lib-check-box-list',
  templateUrl: './check-box-list.component.html',
  styleUrls: ['./check-box-list.component.scss'],
})
export class CheckBoxListComponent implements OnInit, OnDestroy {
  @Input() form: FormArray;
  @Input() label: string;
  @Input() code: string;
  @Input() separateur: boolean = true;
  @Input() checkedPropertyName: string;
  @Input() backupCode: string;
  @Input() position: 'column' | 'row';
  @Input() labelClassName: string;
  @Input() tabIndex: number;
  filterList: IProductRoutingPlanDTO[] = [];
  filterList$: Observable<IProductRoutingPlanDTO[]>;
  @Input() filterForm: FormControl;

  protected _onDestroy = new Subject<void>();

  ngOnInit(): void {
    this.filterList = this.form.value;
    this.filterList$ = of(this.form.value);
    this.filterList$ = this.filterForm.valueChanges.pipe(
      takeUntil(this._onDestroy),
      debounceTime(400),
      distinctUntilChanged(),
      startWith(''),
      map((values) =>
        this.filterList.filter(
          (item: IProductRoutingPlanDTO) =>
            item.codeProduit?.toLowerCase().includes(values?.toLowerCase()) ||
            item.codeProduitEspace
              ?.toLowerCase()
              .includes(values?.toLowerCase()) ||
            item.libelleProduit?.toLowerCase().includes(values?.toLowerCase()),
        ),
      ),
    );
  }

  toggleSelection(checkSelected: IProductRoutingPlanDTO) {
    this.filterList.filter((item: IProductRoutingPlanDTO) => {
      if (item.codeProduit === checkSelected.codeProduit) {
        item.checked = !checkSelected[this.checkedPropertyName];
      }
    });
    this.form.controls.filter(
      (item: AbstractControl<IProductRoutingPlanDTO>) => {
        if (item.value.codeProduit === checkSelected.codeProduit) {
          item.value.checked = checkSelected[this.checkedPropertyName];
        }
      },
    );
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
