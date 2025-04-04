import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup, Validators
} from '@angular/forms';
import { MatLegacyAutocomplete as MatAutocomplete } from '@angular/material/legacy-autocomplete';
import { Observable } from 'rxjs';
import { COMMA } from '@angular/cdk/keycodes';
import { debounceTime, filter, map } from 'rxjs/operators';
import { SearchIndex } from '../../../../models/search-index';

@Component({
  selector: 'bac-input-autocomplete-chip',
  templateUrl: './input-autocomplete-chip.component.html',
  styleUrls: ['./input-autocomplete-chip.component.scss'],
})
export class InputAutocompleteChipComponent implements OnInit {
  @Input() form: UntypedFormGroup;

  inputForm: FormControl;

  @Input() validatorRequireInput: boolean = false;

  @Input() readonly: boolean = false;
  @Input() byServerData: boolean; // By API
  @Input() matiereDangereuse: boolean;
  @Input() restriction: boolean;
  @Input() paramsPrealable: boolean; // Sans une première selection(pays) l'adresse sera masqué. Ex: sans pays selected -> pas de zone
  @Input() sad: boolean;
  @Input() exclusion: boolean;
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'outline';
  @Input() formArrayName: string;
  @Input() label: string;
  @Input() labelPosition: 'inside' | 'above' = 'above';
  @Input() placeholder: string;
  @Input() type: 'email' | 'text' | 'number' | 'password';
  @Input() chipsPosition: 'inside' | 'outside' = 'inside';
  @Input() backgroundColor: string;
  @Input() color = '#ffffff';
  @Input() customStyle: object;
  @Input() firstInputChoice: object;
  @Input() maxlength: number;
  @Input() byDataServiceWeb: Observable<SearchIndex[]>;
  @Input() removableChipFR: boolean;

  @Output() action = new EventEmitter<object>();
  @Output() sendWordAndListExclude = new EventEmitter<object>();
  @Output() sendListChipsLength = new EventEmitter<{
    lengthTabChips: number;
    chipsAffected: object;
    action: 'selected' | 'delete' | 'exclusion';
  }>();

  @Input() disableChipsEtInputTextResetAfterSelect = false; // Masquer les chips et désactiver le RESET / CLEAR du champ input après le choix de localité ...

  @Output() clearAction = new EventEmitter<any>();

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [COMMA];
  addOnBlur: boolean = false;

  @ViewChild('zoneInput') zoneInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  disabledInputAfterChoiceCountry: boolean;

  constructor() {}

  ngOnInit(): void {
    this.inputForm = new FormControl('', this.validatorRequireInput ? [Validators.required] : []);

    this.inputForm.valueChanges.pipe(debounceTime(400))
      .pipe(
        filter(word => typeof word === 'string'),
        map(words => {
          if (this.onlySpaces(words)) {
            this.byDataServiceWeb = new Observable<SearchIndex[]>();
          } else {
            const listExcludeCode = this.form.controls[
              this.formArrayName
            ].value.map(item => item?.code);
            this.sendWordAndListExclude.emit({
              word: words,
              listExclude: listExcludeCode,
            });
          }
        })
      )
      .subscribe();

    // Check pour le button exclure le pays, si une donnée pays seul est présente
    this.disabledInputAfterChoiceCountry = this.form
      .get(this.formArrayName)
      .value.find(item =>  item?.codeRegion === '');
  }

  inputEmptyAction(value: string){
    const listExcludeCode = this.form.controls[this.formArrayName].value.map(item => item?.code);
    if (!value) {
      this.sendWordAndListExclude.emit({
        word: '',
        listExclude: listExcludeCode,
      });
    }
  }

  get formArray(): UntypedFormArray {
    return this.form.get(this.formArrayName) as UntypedFormArray;
  }

  onlySpaces(str) {
    return /^\s*$/.test(str);
  } // return true si un key espace est présent dans l'input

  remove(index: number, chip: object) {
    this.formArray.removeAt(index);
    chip['id'] = index; // Récupération de l'index pour le lien "Libéllé produit" et "Marques"  (car l'object est en listé par Key)
    this.sendListChipsLength.emit({
      lengthTabChips: this.formArray.value.length,
      chipsAffected: chip,
      action: 'delete',
    });
    // Check pour le button exclure le pays, si une donnée pays seul est présente
    const data = this.form
      .get(this.formArrayName)
      .value.find(item => item?.codeRegion === '');

    this.disabledInputAfterChoiceCountry = data !== undefined;
  }

  selected(event): void {
    if (event) {
      const control = new FormControl(event.option.value);
      const paysLocaliteComplete = this.paysLocaliteComplete(
        event?.option?.value
      );
      control.markAsTouched();

      if (this.disableChipsEtInputTextResetAfterSelect) {
        // Une seul choix !
        this.clear();
      }

      this.formArray.push(control);
      this.zoneInput.nativeElement.value = this
        .disableChipsEtInputTextResetAfterSelect
        ? paysLocaliteComplete
        : '';
      this.inputForm.setValue(
        this.disableChipsEtInputTextResetAfterSelect ? paysLocaliteComplete : ''
      );

      this.byDataServiceWeb = new Observable<SearchIndex[]>();
      this.sendListChipsLength.emit({
        lengthTabChips: this.formArray.value.length,
        chipsAffected: event.option.value,
        action: 'selected',
      });
    }
  }

  clear() {
    while (this.formArray.value.length !== 0) {
      this.formArray.removeAt(0);
    }
    this.zoneInput.nativeElement.value = '';
    this.inputForm.setValue('');

    this.clearAction.emit(this.inputForm.value);
  }

  actions(item: object, index: number) {
    this.action.emit(item);
  }

  includeCountryForExclusion(): void {
    const exclure = { codePays: this.firstInputChoice['code'] };
    // Check si la valeur codePays existe déjà dans la liste
    const data = this.form
      .get(this.formArrayName)
      .value.find(
        item =>
          item.codePays === exclure.codePays &&
          !item.hasOwnProperty('codeRegion')
      );
    if (!data) {
      const control = new UntypedFormControl(exclure);
      control.markAsTouched();
      this.formArray.push(control);
      this.zoneInput.nativeElement.value = '';
      this.inputForm.setValue('');
      this.byDataServiceWeb = new Observable<SearchIndex[]>();
      this.sendListChipsLength.emit({
        lengthTabChips: this.formArray.value.length,
        chipsAffected: exclure,
        action: 'exclusion',
      });
      this.disabledInputAfterChoiceCountry = true;
    }
  }

  paysLocaliteComplete(value: string): string {
    return (
      (!!value['codePays'] ? '(' + value['codePays'] + ')' : '') +
      ' ' +
      value['codePostal'] +
      ' ' +
      (value['codePostal'] === '' ? value['codeRegion'] : '') +
      ' ' +
      (!!value['libelleLocalite'] && value['libelleLocalite'] !== ''
        ? value['libelleLocalite']
        : '')
    );
  }

  get styleObject() {
    return {
      backgroundColor: `${this.backgroundColor}`,
      color: `${this.color}`,
      ...this.customStyle,
    };
  } // couleur et bordure chip -> custom

  get iconColor() {
    return {
      color: `${this.color}`,
    };
  }
}
