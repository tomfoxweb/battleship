import { Position } from './sea';

export const enum PartState {
  good,
  hit,
  sunk,
}

export class Ship {
  private positions: Position[];
  private partStates: PartState[];
  private state: PartState;

  constructor(positions: Position[]) {
    this.positions = positions;
    this.state = PartState.good;
    this.partStates = this.positions.map(() => PartState.good);
  }

  hit(hitPosition: Position) {
    const partIndex = this.positions.findIndex(
      (x) => x.row === hitPosition.row && x.column === hitPosition.column
    );
    if (partIndex < 0) {
      return;
    }
    this.partStates[partIndex] = PartState.hit;
    if (this.partStates.every((partState) => partState === PartState.hit)) {
      this.partStates.fill(PartState.sunk);
      this.state = PartState.sunk;
    }
  }

  getState() {
    return this.state;
  }
}
