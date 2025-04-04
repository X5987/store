import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'bac-input-autocomplete-text',
  templateUrl: './input-autocomplete-text.component.html',
  styleUrls: ['./input-autocomplete-text.component.scss']
})
export class InputAutocompleteTextComponent implements OnInit {
  @Input() control: UntypedFormControl;
  @Input() customStyle: object;
  @Input() filteredOptions: Observable<any>;
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline';
  @Input() label: string;
  @Input() placeholder: string;
  @Input() simpleSelect: boolean;
  @Input() localiteSelect: boolean;

  constructor() { }

  ngOnInit(): void { }

  displayFn(value: any) {
    switch (value.type) {
      case 'RG': {
        return value.codeRegion;
        break;
      }
      case 'LO': {
        return value.codePostal + ' - ' + value.libelleLocalite;
        break;
      }
      default: {
        return value.codePostal;
        break;
      }
    }
  }

}
