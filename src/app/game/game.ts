import { Column, Row, Sea, SeaIndex } from './sea';
import { Viewable } from './viewable';

export class Game {
  private view: Viewable;
  private playerSea: Sea;
  private opponentSea: Sea;

  constructor(view: Viewable) {
    this.view = view;
    this.playerSea = new Sea(this.view, 0);
    this.opponentSea = new Sea(this.view, 1);
    this.playerSea.addShip([{ row: 8, column: 3 }]);
    this.playerSea.addShip([
      { row: 2, column: 6 },
      { row: 2, column: 7 },
    ]);
    this.playerSea.addShip([
      { row: 2, column: 1 },
      { row: 3, column: 1 },
      { row: 4, column: 1 },
    ]);
    this.playerSea.addShip([
      { row: 5, column: 5 },
      { row: 5, column: 6 },
      { row: 5, column: 7 },
      { row: 5, column: 8 },
    ]);
    this.opponentSea.placeRandom();
  }

  restart() {
    this.playerSea.clear();
    this.opponentSea.clear();
  }

  setOrderedPositions() {
    this.playerSea.placeOrdered();
  }

  setRandomPositions() {
    this.opponentSea.placeRandom();
  }

  hit(row: Row, column: Column, seaIndex: SeaIndex) {
    if (seaIndex === 0) {
      this.playerSea.hit(row, column);
    } else {
      this.opponentSea.hit(row, column);
    }
  }
}
