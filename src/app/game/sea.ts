import { Ship } from './ship';
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

export const enum ShipType {
  battleship,
  destroyer,
  submarine,
  boat,
}

export const enum CellType {
  empty,
  battleship,
  destroyer,
  submarine,
  boat,
  miss,
  hit,
  sunk,
}

export type SeaIndex = 0 | 1;

export class Sea {
  private view: Viewable;
  private seaIndex: SeaIndex;
  private gameMap: CellType[][];
  private ships: Ship[];
  private shipMap: Map<Position, number>;

  constructor(view: Viewable, seaIndex: SeaIndex) {
    this.view = view;
    this.seaIndex = seaIndex;
    this.gameMap = [];
    for (let row = 0; row < ROW_COUNT; row++) {
      this.gameMap.push([]);
      for (let column = 0; column < COLUMN_COUNT; column++) {
        this.gameMap[row].push(CellType.empty);
        this.view.showEmptyCell(row as Row, column as Column, this.seaIndex);
      }
    }
    this.ships = [];
    this.shipMap = new Map();
  }

  clear() {
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let column = 0; column < COLUMN_COUNT; column++) {
        this.gameMap[row][column] = CellType.empty;
        this.view.showEmptyCell(row as Row, column as Column, this.seaIndex);
      }
    }
  }

  addShip(positions: Position[], shipType: ShipType) {
    let cellType = CellType.boat;
    switch (shipType) {
      case ShipType.battleship:
        cellType = CellType.battleship;
        break;
      case ShipType.destroyer:
        cellType = CellType.destroyer;
        break;
      case ShipType.submarine:
        cellType = CellType.submarine;
        break;
      case ShipType.boat:
        cellType = CellType.boat;
        break;
    }
    this.ships.push(new Ship(positions));
    positions.forEach((position) => {
      this.gameMap[position.row][position.column] = cellType;
      this.shipMap.set(position, this.ships.length - 1);
      this.view.showShipCell(position.row, position.column, this.seaIndex);
    });
  }

  hit(row: Row, column: Column) {
    const shipIndex = this.shipMap.get({ row, column });
    if (shipIndex === undefined) {
      this.gameMap[row][column] = CellType.miss;
      this.view.showMissCell(row, column, this.seaIndex);
    } else {
      const ship = this.ships[shipIndex];
      ship.hit({ row, column });
    }
  }
}
