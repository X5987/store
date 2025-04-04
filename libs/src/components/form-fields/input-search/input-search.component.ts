import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'bac-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSearchComponent implements OnInit {
  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'outline';
  @Input() control: UntypedFormControl = new UntypedFormControl();
  @Input() label: string;
  @Input() placeholder: string;
  @Input() readonly: false;
  @Output() searchEmiter = new EventEmitter<true>();
  constructor() { }

  ngOnInit(): void {
  }

  clear() {
    this.control.setValue('');
    this.control.updateValueAndValidity();
  }

  search(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchEmiter.emit(true);
    }
  }
}
