import { Component, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardImage,
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatChip, MatChipSet } from '@angular/material/chips';

@Component({
  selector: 'app-grid-by-css',
  templateUrl: './grid-by-css.component.html',
  styleUrl: './grid-by-css.component.scss',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardImage,
    MatCardActions,
    MatButton,
    MatCardFooter,
    MatChip,
    MatChipSet,
  ],
})
export class GridByCssComponent implements OnInit {
  ngOnInit(): void {}
}
