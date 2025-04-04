import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'bac-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckBoxComponent implements OnInit {

  @Input() control: UntypedFormControl;
  @Input() label: string;
  @Input() labelPosition: 'before' | 'after';
  constructor() { }

  ngOnInit(): void {
  }

}
