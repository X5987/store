import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[libLoaderSimpleDirective]',
  standalone: true,
})
export class LoaderSimpleDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.innerHTML = `
  <div id="wifi-loader">
    <svg class="circle-inner" viewBox="0 0 34 34">
        <circle class="back" cx="17" cy="17" r="14"></circle>
        <circle class="front" cx="17" cy="17" r="14"></circle>
    </svg>
</div>`;
  }
}
