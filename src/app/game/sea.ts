import { Ship, ShipState } from './ship';
import { Viewable } from './viewable';

export type Row = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Column = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export interface Position {
  row: Row;
  column: Column;
}

export const ROW_COUNT = 10;
export const COLUMN_COUNT = 10;
export const CELL_COUNT = ROW_COUNT * COLUMN_COUNT;

export const enum Cell {
  empty,
  ship,
  miss,
  hit,
  sunk,
}

export type SeaIndex = 0 | 1;

export class Sea {
  private view: Viewable;
  private seaIndex: SeaIndex;
  private gameMap: Cell[][];
  private ships: Ship[];
  private shipMap: (Ship | null)[][];
  private readonly shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

  constructor(view: Viewable, seaIndex: SeaIndex) {
    this.view = view;
    this.seaIndex = seaIndex;
    this.gameMap = [];
    this.shipMap = [];
    for (let row = 0; row < ROW_COUNT; row++) {
      this.gameMap.push([]);
      this.shipMap.push([]);
      for (let column = 0; column < COLUMN_COUNT; column++) {
        this.gameMap[row].push(Cell.empty);
        this.shipMap[row].push(null);
        this.view.showEmptyCell(row as Row, column as Column, this.seaIndex);
      }
    }
    this.ships = [];
  }

  clear() {
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let column = 0; column < COLUMN_COUNT; column++) {
        this.gameMap[row][column] = Cell.empty;
        this.shipMap[row][column] = null;
        this.view.showEmptyCell(row as Row, column as Column, this.seaIndex);
      }
    }
    this.ships = [];
  }

  addShip(positions: Position[]) {
    const ship = new Ship(positions);
    this.ships.push(ship);
    positions.forEach((position) => {
      this.gameMap[position.row][position.column] = Cell.ship;
      this.shipMap[position.row][position.column] = ship;
      this.view.showShipCell(position.row, position.column, this.seaIndex);
    });
  }

  hit(row: Row, column: Column) {
    const ship = this.shipMap[row][column];
    if (ship === null) {
      this.processMissHit(row, column);
    } else {
      this.processSuccessHit(row, column, ship);
    }
  }

  private processMissHit(row: Row, column: Column) {
    this.gameMap[row][column] = Cell.miss;
    this.view.showMissCell(row, column, this.seaIndex);
  }

  private processSuccessHit(row: Row, column: Column, ship: Ship) {
    ship.hit({ row, column });
    const shipState = ship.getState();
    if (shipState === ShipState.hit) {
      this.view.showHitCell(row, column, this.seaIndex);
    } else if (shipState === ShipState.sunk) {
      const shipPartsPositions = ship.getSectionsPositions();
      shipPartsPositions.forEach((position) => {
        this.view.showSunkCell(position.row, position.column, this.seaIndex);
      });
    }
  }

  placeOrdered() {
    this.clear();
    this.addShip([
      { row: 1, column: 1 },
      { row: 1, column: 2 },
      { row: 1, column: 3 },
      { row: 1, column: 4 },
    ]);
    this.addShip([
      { row: 3, column: 1 },
      { row: 3, column: 2 },
      { row: 3, column: 3 },
    ]);
    this.addShip([
      { row: 3, column: 5 },
      { row: 3, column: 6 },
      { row: 3, column: 7 },
    ]);
    this.addShip([
      { row: 5, column: 1 },
      { row: 5, column: 2 },
    ]);
    this.addShip([
      { row: 5, column: 4 },
      { row: 5, column: 5 },
    ]);
    this.addShip([
      { row: 5, column: 7 },
      { row: 5, column: 8 },
    ]);
    this.addShip([{ row: 7, column: 1 }]);
    this.addShip([{ row: 7, column: 3 }]);
    this.addShip([{ row: 7, column: 5 }]);
    this.addShip([{ row: 7, column: 7 }]);
  }

  placeRandom() {
    this.clear();
    this.shipSizes.forEach((size) => {
      const positions = this.calcRandomShipPositions(size);
      const randIndex = Math.trunc(Math.random() * positions.length);
      const randPositions = positions[randIndex];
      this.addShip(randPositions);
    });
  }

  calcRandomShipPositions(shipSize: number): Position[][] {
    const horizontalPositions = this.calcRandomHorizontalPositions(shipSize);
    const verticalPositions = this.calcRandomVerticalPositions(shipSize);
    return horizontalPositions.concat(verticalPositions);
  }

  calcRandomHorizontalPositions(shipSize: number): Position[][] {
    const positions: Position[][] = [];
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let col = 0; col <= COLUMN_COUNT - shipSize; col++) {
        let goodPosition = true;
        const currPositions: Position[] = [];
        for (let i = 0; i < shipSize; i++) {
          const currRow: Row = row as Row;
          const currCol: Column = (col + i) as Column;
          currPositions.push({ row: currRow, column: currCol });
          if (!this.canPlaceShip(currRow, currCol)) {
            goodPosition = false;
            break;
          }
        }
        if (goodPosition) {
          positions.push(currPositions);
        }
      }
    }
    return positions;
  }

  calcRandomVerticalPositions(shipSize: number): Position[][] {
    const positions: Position[][] = [];
    for (let row = 0; row <= ROW_COUNT - shipSize; row++) {
      for (let col = 0; col < COLUMN_COUNT; col++) {
        let goodPosition = true;
        const currPositions: Position[] = [];
        for (let i = 0; i < shipSize; i++) {
          const currRow: Row = (row + i) as Row;
          const currCol: Column = col as Column;
          currPositions.push({ row: currRow, column: currCol });
          if (!this.canPlaceShip(currRow, currCol)) {
            goodPosition = false;
            break;
          }
        }
        if (goodPosition) {
          positions.push(currPositions);
        }
      }
    }
    return positions;
  }

  private canPlaceShip(rowStart: Row, columnStart: Column): boolean {
    const aroundPositions: Position[] = [];
    for (let row = rowStart - 1; row <= rowStart + 1; row++) {
      for (let col = columnStart - 1; col <= columnStart + 1; col++) {
        if (this.isPositionOnMap(row, col)) {
          aroundPositions.push({ row: row as Row, column: col as Column });
        }
      }
    }
    return aroundPositions.every((x) => this.shipMap[x.row][x.column] === null);
  }

  private isPositionOnMap(row: number, column: number) {
    if (row < 0 || row >= ROW_COUNT) {
      return false;
    }
    if (column < 0 || column >= COLUMN_COUNT) {
      return false;
    }
    return true;
  }
}
