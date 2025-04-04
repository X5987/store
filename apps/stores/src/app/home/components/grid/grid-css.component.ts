import { Component, Signal, signal } from '@angular/core';
import { GridComponent, GridStructur, TileTypeEnum } from '@stores/libs';

@Component({
  selector: 'app-grid-css',
  templateUrl: './grid-css.component.html',
  styleUrl: './grid-css.component.scss',
  imports: [GridComponent],
})
export class GridCssComponent {
  protected readonly TileTypeEnum = TileTypeEnum;

  gridData: Signal<GridStructur> = signal({
    grid: {
      cols: 4,
      rowHeight: 100,
      gutterSize: 20,
    },
    tile: [
      { text: '', cols: 3, rows: 2, color: '#ffdbe0', border_radius: 10 },
      { text: '', cols: 1, rows: 4, color: '#d7f4ff', border_radius: 10 },
      { text: '', cols: 1, rows: 2, color: '#ceffce', border_radius: 10 },
      { text: '', cols: 2, rows: 2, color: '#fff9d5', border_radius: 10 },
    ],
  });
}
