import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  Injector,
  Type,
} from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'lib-storybook-form-control-host',
  imports: [ReactiveFormsModule],
  template: `<ng-container #container></ng-container>`,
})
export class StorybookFormControlHostComponent implements OnInit {
  @Input() component!: Type<unknown>;
  @Input() inputs: Record<string, any> = {};

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  ngOnInit(): void {
    if (!this.component) {
      throw new Error('Missing Input: component');
    }

    const injector = Injector.create({
      providers: [
        {
          provide: FormControl,
          useValue: new FormControl(''),
        },
      ],
    });

    const ref = this.container.createComponent(this.component as Type<any>, {
      injector,
    });

    Object.entries(this.inputs).forEach(([key, value]) => {
      ref.setInput?.(key, value);
    });
  }
}
