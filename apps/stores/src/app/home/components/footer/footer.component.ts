import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [MatCard, MatCardContent],
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
