import {Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatLegacyAutocomplete as MatAutocomplete, MatLegacyAutocompleteSelectedEvent as MatAutocompleteSelectedEvent, MatLegacyAutocompleteTrigger as MatAutocompleteTrigger } from '@angular/material/legacy-autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, Subject } from 'rxjs';
import { MatLegacyMenuTrigger as MatMenuTrigger } from '@angular/material/legacy-menu';
import {ICriteriafilter} from "../../../../models/criteria-filter";
import {IChip} from "../../../../models/product/dashboard-criteria-chip";



@Component({
  selector: 'bac-chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.scss']
})
export class ChipsAutocompleteComponent implements OnInit {
  @Input() control: UntypedFormControl;
  @Input() inputForm: UntypedFormControl;

  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'outline';
  @Input() comparFn: (a: { code: string, libelle: string }, b: { code: string, libelle: string }) => boolean;
  @Input() label: string;
  @Input() optionTemplate: TemplateRef<any>;
  @Input() menuContextTemplate: TemplateRef<any>;
  @Input() menuContextTemplateInfoDesti: TemplateRef<any>;
  @Input() placeholder: string;
  @Input() apiData: (args: any) => Observable<any>;

  @Input() listActionsReveiced$: Observable<ICriteriafilter[]>;
  @Input() listfiltersReveiced$: Observable<ICriteriafilter[]>;
  @Input() listValeursReveiced$: Observable<ICriteriafilter[]>;

  @Input() sansOperateur: boolean;

  @Output() sendAction: EventEmitter<any> = new EventEmitter();
  @Output() sendListChips: EventEmitter<object> = new EventEmitter();
  @Output() listChipsLength: EventEmitter<number> = new EventEmitter();

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  chipsList: IChip[] = [];

  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

  basicOrNot: boolean;
  contextMenuPosition = { x: 0, y: 0 };

  currentChipIndex: number;
  currentChip: string;
  currentChipOperator: string;
  currentChipList: string[];

  @ViewChild('zoneInput') zoneInput: ElementRef<HTMLInputElement>;

  protected _onDestroy = new Subject<void>();
  constructor() { }

  ngOnInit(): void {}

  removeChip(chip: IChip): void {
    const index = this.chipsList.indexOf(chip);
    if (index >= 0) {
      this.chipsList.splice(index, 1);
      this.listChipsLength.emit(this.chipsList.length);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const chipEvent = this.chipArrayFormat(event.option.viewValue) as IChip;
    if (!this.findAlreadyChipInsideListChip(chipEvent)) {
      if (this.findInListChip(chipEvent) !== -1) { // verifie si la chip selectionné est déjà présente
        this.findInListChipAndPushByIndex(chipEvent);
      } else {
        this.chipsList.push(chipEvent);
      }
    }
    // this.autocomplete.openPanel();
    this.chipsList = this.chipsList.filter((value, index) => this.chipsList.indexOf(value) === index);
    this.listChipsLength.emit(this.chipsList.length);
    this.zoneInput.nativeElement.value = '';
    this.inputForm.setValue('');
    this.clearActionsAndFilters();
  }

  private findInListChip(chipCurrent: IChip) {
    return this.chipsList.findIndex(value => value.type === chipCurrent.type);
  }

  private findInListChipAndPushByIndex(chipCurrent: IChip) {
    const chipFind = this.chipsList.findIndex(value => value.type === chipCurrent.type);
    this.chipsList[chipFind].values.push(...chipCurrent.values);
  }

  private findAlreadyChipInsideListChip(chipEvent) {
    let findIt = false;
    this.chipsList.forEach(value => {
      if (value.type === chipEvent.type) {
        value.values.forEach(Values => {
          if (Values === chipEvent.values[0]) {
            return findIt = true;
          }
        });
      }
    });
    return findIt;
  }

  rightClick(event: MouseEvent, chip: any, index: number) {
    event.preventDefault();
    // const chipCurrentAnalyse = this.chipArrayFormat(event.target['innerText']);
    this.contextMenuPosition = { x: event.x - 97, y: event.y - 227 };
    this.currentChipList = chip.values;
    this.currentChip = chip;
    this.currentChipIndex = index;
    this.currentChipOperator = chip.operator;
    if (chip.type !== 'infodesti' && chip.type !== 'international' && chip.type !== 'autorise'
      && chip.type !== 'affGeolabel' && chip.type !== 'affPos' && chip.type !== 'affClient') {
      this.basicOrNot = true;
    } else {
      this.basicOrNot = false;
    }

    if (this.currentChipList.length > 1) {
      this.contextMenu.openMenu();
    }
    if (chip.type === 'infodesti' || chip.type === 'international' || chip.type === 'autorise'
      || chip.type === 'affGeolabel' || chip.type === 'affPos' || chip.type === 'affClient') {
      this.contextMenu.openMenu();
    }
  }

  choiceSurChip(choice: string | boolean) {
    if (typeof choice === 'string') {
      this.chipsList[this.currentChipIndex].operator = choice;
    } else if (typeof choice === 'boolean') {
      this.chipsList[this.currentChipIndex].values = [choice ? 'true' : 'false'];
    }
  }

  choiceDelete(currentChipValuesIndex, currentChipList) {
    const afterDeleteType = currentChipList.indexOf(currentChipValuesIndex);
    this.chipsList[this.currentChipIndex]['values'].splice(afterDeleteType, 1);
  }

  chipDestructure(chip) {
    return chip.split(':');
  }

  chipArrayFormat(chip: string) {
    const chipSplit = this.chipDestructure(chip);
    return {
      type: chipSplit[0],
      values: [chipSplit[1].toUpperCase()],
      operator: chipSplit[2] ? chipSplit[2] : chipSplit[0] !== 'familleProduit' ? 'AND' : ''
    };
  }

  envoiDefinitif() {
    if (!this.sansOperateur) {
      this.chipsList.forEach(value => {
        if (value.type !== 'infodesti'
          && value.type !== 'international'
          && value.type !== 'familleProduit'
          && value.type !== 'affGeolabel'
          && value.type !== 'affPos'
          && value.type !== 'affClient'
          && value.operator === ''
          && value.values.length > 1) {
          value.operator = 'AND';
        } else if (value.type !== 'infodesti'
          && value.type !== 'international'
          && value.type !== 'familleProduit'
          && value.type !== 'affGeolabel'
          && value.type !== 'affPos'
          && value.type !== 'affClient'
          && value.values.length === 1) {
          value.operator = '';
        }
      });
    } else {
      this.chipsList.forEach(value => {
        value.operator = '';
      });
    }
    this.sendListChips.emit(this.chipsList);
  }

  action(item) {
    this.sendAction.emit(item);
  }

  clear(): void {
    this.chipsList = [];
    if (this.zoneInput) {
      this.zoneInput.nativeElement.value = '';
      this.listActionsReveiced$ = new Observable<ICriteriafilter[]>();
      this.listfiltersReveiced$ = new Observable<ICriteriafilter[]>();
      this.listValeursReveiced$ = new Observable<ICriteriafilter[]>();
    }
    this.inputForm.setValue(null);
  }

  clearActionsAndFilters(): void {
    this.listActionsReveiced$ = new Observable<ICriteriafilter[]>();
    this.listfiltersReveiced$ = new Observable<ICriteriafilter[]>();
    this.listValeursReveiced$ = new Observable<ICriteriafilter[]>();
  }

  chipColor(chip: string) {
    switch (chip) {
      case 'sad': {
        return '#3200e6';
      }
      case 'paysExp': {
        return '#197d5d';
      }
      case 'paysDst': {
        return '#cc7810';
      }
      case 'marque': {
        return '#575757';
      }
      case 'devise': {
        return '#dedede';
      }
      case 'incoterm': {
        return '#cc69a5';
      }
      case 'typeSaisie': {
        return '#bddaf5';
      }
      default: {
        return '#3200e6';
        break;
      }
    }
  }
}
