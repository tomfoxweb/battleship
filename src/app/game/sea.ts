export type Row = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Column = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export interface Position {
  row: Row;
  column: Column;
}

export const ROW_COUNT = 10;
export const COLUMN_COUNT = 10;
export const CELL_COUNT = ROW_COUNT * COLUMN_COUNT;

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
