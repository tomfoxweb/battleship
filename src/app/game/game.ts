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
    this.playerSea.placeInOrder();
    this.opponentSea.placeRandomly();
  }

  restart() {
    this.playerSea.clear();
    this.opponentSea.clear();
  }

  placePlayerShipsInOrder() {
    this.playerSea.placeInOrder();
  }

  placeOpponentShipsRandomly() {
    this.opponentSea.placeRandomly();
  }

  hit(row: Row, column: Column, seaIndex: SeaIndex) {
    if (seaIndex === 0) {
      this.playerSea.hit(row, column);
    } else {
      this.opponentSea.hit(row, column);
    }
  }
}
