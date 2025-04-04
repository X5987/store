import { Component, Input, Signal } from '@angular/core';
import { GridStructur, TileTypeEnum } from '../../interfaces';
import { NgTemplateOutlet } from '@angular/common';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

@Component({
  selector: 'lib-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  imports: [NgTemplateOutlet, MatGridList, MatGridTile],
})
export class GridComponent {
  @Input({ required: true }) tileTypes!: TileTypeEnum;
  @Input({ required: true }) grid!: Signal<GridStructur>;
  protected readonly TileTypeEnum = TileTypeEnum;
}
