import { Component, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatLegacyCheckboxChange as MatCheckboxChange } from '@angular/material/legacy-checkbox';
import { MatLegacySelect as MatSelect } from '@angular/material/legacy-select';
import { OverlayContainer } from '@angular/cdk/overlay';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'lib-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectComponent implements AfterViewInit, OnDestroy {
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'outline';
  @Input() control: UntypedFormControl;
  @Input() readonly = false;
  @Input() hasIcon = false;
  @Input() paddingPlaceHolder = false;
  @Input() label: string;
  @Input() labelPosition: 'inside' | 'above' = 'above';
  @Input() options: { code: string, libelle: string }[];
  @Input() placeholder: string;
  @Input() selectAllLabel: string;
  @Input() severalSelected: string;
  @ViewChild(MatSelect) select: MatSelect;
  protected _onDestroy = new Subject<void>();
  constructor(private overlayContainer: OverlayContainer) { }

  ngAfterViewInit() {
    this.select.openedChange.pipe(
      tap((opened: boolean) => {
        if (!opened) {
          this.overlayContainer.getContainerElement().classList.remove('select-overlay');
        }
      }),
      takeUntil(this._onDestroy)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  beforeOpen() {
    this.overlayContainer.getContainerElement().classList.add('select-overlay');
  }

  toggleAllSelection(change: MatCheckboxChange) {
    if (change.checked) {
      this.control.patchValue([...this.options]);
    } else {
      this.control.patchValue([]);
    }
  }

  isChecked(): boolean {
    return this.control.value && this.options.length
      && this.control.value.length === this.options.length;
  }

  isIndeterminate() {
    return this.control.value && this.options.length && this.control.value.length
      && this.control.value.length < this.options.length;
  }

  get value(): string {
    if (this.control.value) {
      if (this.control.value?.length === 1) {
       return  this.options.find(opt => opt.code === this.control.value[0].code).libelle;
      } else if (this.control.value.length > 1 && this.control.value.length < this.options.length) {
        if (this.severalSelected) {
          return this.severalSelected;
        } else {
          return this.control.value.map((v: { code: string, libelle: string }) => v.libelle).join(', ');
        }
      } else {
        if (this.severalSelected) {
          return this.placeholder;
        } else {
          return this.control.value.map((v: { code: string, libelle: string }) => v.libelle).join(', ');
        }
      }
    }
  }
}
