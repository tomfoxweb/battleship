import { Component, OnInit } from '@angular/core';
import { Game } from './game/game';
import {
  CELL_COUNT,
  Column,
  COLUMN_COUNT,
  Row,
  ROW_COUNT,
  SeaIndex,
} from './game/sea';
import { Viewable } from './game/viewable';
import { GameImageType, ImageProviderService } from './image-provider.service';

interface Cell {
  row: Row;
  column: Column;
  imageUrls: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, Viewable {
  title = 'battleship';
  playerMap = new Array<Cell>(CELL_COUNT);
  opponentMap = new Array<Cell>(CELL_COUNT);
  private game: Game | undefined;

  constructor(private imageProvider: ImageProviderService) {}

  async ngOnInit() {
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let column = 0; column < COLUMN_COUNT; column++) {
        const index = row * COLUMN_COUNT + column;
        this.playerMap[index] = {
          row: row as Row,
          column: column as Column,
          imageUrls: [],
        };
        this.opponentMap[index] = {
          row: row as Row,
          column: column as Column,
          imageUrls: [],
        };
      }
    }
    await this.imageProvider.loadImages();
    const oceanImageUrl = this.imageProvider.getImage(GameImageType.ocean);
    this.game = new Game(this);
  }

  hit(row: Row, column: Column, seaIndex: SeaIndex) {
    if (this.game) {
      this.game.hit(row, column, seaIndex);
    }
  }

  showEmptyCell(row: Row, column: Column, seaIndex: SeaIndex): void {
    const oceanImageUrl = this.imageProvider.getImage(GameImageType.ocean);
    const index = row * COLUMN_COUNT + column;
    if (seaIndex === 0) {
      this.playerMap[index].imageUrls = [oceanImageUrl];
    } else {
      this.opponentMap[index].imageUrls = [oceanImageUrl];
    }
  }

  showShipCell(row: Row, column: Column, seaIndex: SeaIndex): void {
    const oceanImageUrl = this.imageProvider.getImage(GameImageType.ocean);
    const index = row * COLUMN_COUNT + column;
    if (seaIndex === 0) {
      const shipUrl = this.imageProvider.getImage(GameImageType.player);
      this.playerMap[index].imageUrls = [oceanImageUrl, shipUrl];
    } else {
      const shipUrl = this.imageProvider.getImage(GameImageType.opponent);
      this.opponentMap[index].imageUrls = [oceanImageUrl, shipUrl];
    }
  }

  showMissCell(row: Row, column: Column, seaIndex: SeaIndex): void {
    const oceanImageUrl = this.imageProvider.getImage(GameImageType.ocean);
    const missImageUrl = this.imageProvider.getImage(GameImageType.miss);
    const index = row * COLUMN_COUNT + column;
    if (seaIndex === 0) {
      this.playerMap[index].imageUrls = [oceanImageUrl, missImageUrl];
    } else {
      this.opponentMap[index].imageUrls = [oceanImageUrl, missImageUrl];
    }
  }

  showHitCell(row: Row, column: Column, seaIndex: SeaIndex): void {
    const oceanImageUrl = this.imageProvider.getImage(GameImageType.ocean);
    const hitImageUrl = this.imageProvider.getImage(GameImageType.hit);
    const index = row * COLUMN_COUNT + column;
    if (seaIndex === 0) {
      const shipUrl = this.imageProvider.getImage(GameImageType.player);
      this.playerMap[index].imageUrls = [oceanImageUrl, shipUrl, hitImageUrl];
    } else {
      const shipUrl = this.imageProvider.getImage(GameImageType.opponent);
      this.opponentMap[index].imageUrls = [oceanImageUrl, shipUrl, hitImageUrl];
    }
  }

  showSunkCell(row: Row, column: Column, seaIndex: SeaIndex): void {
    const oceanImageUrl = this.imageProvider.getImage(GameImageType.ocean);
    const sunkImageUrl = this.imageProvider.getImage(GameImageType.sunk);
    const index = row * COLUMN_COUNT + column;
    if (seaIndex === 0) {
      const shipUrl = this.imageProvider.getImage(GameImageType.player);
      this.playerMap[index].imageUrls = [oceanImageUrl, shipUrl, sunkImageUrl];
    } else {
      const shipUrl = this.imageProvider.getImage(GameImageType.opponent);
      this.opponentMap[index].imageUrls = [
        oceanImageUrl,
        shipUrl,
        sunkImageUrl,
      ];
    }
  }
}
