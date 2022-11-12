export type Row = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Column = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const ROW_COUNT = 10;
export const COLUMN_COUNT = 10;

export const enum Cell {
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
