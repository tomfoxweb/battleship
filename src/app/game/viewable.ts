import { Column, Row, SeaIndex } from './sea';

export interface Viewable {
  showEmptyCell(row: Row, column: Column, seaIndex: SeaIndex): void;
  showShipCell(row: Row, column: Column, seaIndex: SeaIndex): void;
  showMissCell(row: Row, column: Column, seaIndex: SeaIndex): void;
  showHitCell(row: Row, column: Column, seaIndex: SeaIndex): void;
  showSunkCell(row: Row, column: Column, seaIndex: SeaIndex): void;
}
