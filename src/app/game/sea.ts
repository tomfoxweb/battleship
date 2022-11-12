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
}
