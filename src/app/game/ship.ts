import { Position } from './sea';

export const enum ShipState {
  good,
  hit,
  sunk,
}

export class Ship {
  private sectionsPositions: Position[];
  private sectionsStates: ShipState[];
  private shipState: ShipState;

  constructor(sectionsPositions: Position[]) {
    this.sectionsPositions = sectionsPositions;
    this.shipState = ShipState.good;
    this.sectionsStates = this.sectionsPositions.map(() => ShipState.good);
  }

  hit(hitPosition: Position) {
    if (this.shipState === ShipState.sunk) {
      return;
    }
    const sectionIndex = this.sectionsPositions.findIndex(
      (x) => x.row === hitPosition.row && x.column === hitPosition.column
    );
    if (sectionIndex < 0) {
      return;
    }
    this.sectionsStates[sectionIndex] = ShipState.hit;
    this.shipState = ShipState.hit;
    if (this.sectionsStates.every((state) => state === ShipState.hit)) {
      this.sectionsStates.fill(ShipState.sunk);
      this.shipState = ShipState.sunk;
    }
  }

  getState() {
    return this.shipState;
  }

  getSectionsPositions() {
    return this.sectionsPositions;
  }
}
