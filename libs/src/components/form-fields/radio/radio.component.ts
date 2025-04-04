import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatLegacyRadioChange as MatRadioChange } from '@angular/material/legacy-radio';

@Component({
  selector: 'bac-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  @Input() control: UntypedFormControl;
  @Input() color: ThemePalette;
  @Input() listDeSelection: any[];
  @Input() preSelection: string;
  @Input() isDisable: boolean;
  @Output() returnChoice: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.control.setValue(this.preSelection);
  }

  onChange($event: MatRadioChange): void {
    this.returnChoice.emit($event);
  }

}
