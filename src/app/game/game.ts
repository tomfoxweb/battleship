import { Column, COLUMN_COUNT, Row, ROW_COUNT } from './sea';
import { Viewable } from './viewable';

export class Game {
  private view: Viewable;

  constructor(view: Viewable) {
    this.view = view;
  }

  restart() {
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let column = 0; column < COLUMN_COUNT; column++) {
        this.view.showSunkCell(row as Row, column as Column, 0);
        this.view.showHitCell(row as Row, column as Column, 1);
      }
    }
  }
}
