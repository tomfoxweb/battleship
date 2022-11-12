import { Column, Row, Sea, SeaIndex, ShipType } from './sea';
import { Viewable } from './viewable';

export class Game {
  private view: Viewable;
  private playerSea: Sea;
  private opponentSea: Sea;

  constructor(view: Viewable) {
    this.view = view;
    this.playerSea = new Sea(this.view, 0);
    this.opponentSea = new Sea(this.view, 1);
    this.playerSea.addShip([{ row: 0, column: 0 }], ShipType.boat);
    this.opponentSea.addShip([{ row: 2, column: 2 }], ShipType.boat);
    this.view.showSunkCell(0, 0, 0);
    this.view.showSunkCell(2, 2, 1);
  }

  restart() {
    this.playerSea.clear();
    this.opponentSea.clear();
  }

  hit(row: Row, column: Column, seaIndex: SeaIndex) {
    if (seaIndex === 0) {
      this.playerSea.hit(row, column);
    } else {
      this.opponentSea.hit(row, column);
    }
  }
}
