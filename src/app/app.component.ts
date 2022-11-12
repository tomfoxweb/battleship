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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, Viewable {
  title = 'battleship';
  playerMap = new Array<string[]>(CELL_COUNT);
  opponentMap = new Array<string[]>(CELL_COUNT);
  private game: Game | undefined;

  constructor(private imageProvider: ImageProviderService) {}

  async ngOnInit() {
    await this.imageProvider.loadImages();
    const oceanImageUrl = this.imageProvider.getImage(GameImageType.ocean);
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let column = 0; column < COLUMN_COUNT; column++) {
        const index = row * COLUMN_COUNT + column;
        this.playerMap[index] = [oceanImageUrl];
        this.opponentMap[index] = [oceanImageUrl];
      }
    }
    this.game = new Game(this);
    this.game.restart();
  }

  showEmptyCell(row: Row, column: Column, seaIndex: SeaIndex): void {
    const oceanImageUrl = this.imageProvider.getImage(GameImageType.ocean);
    const index = row * COLUMN_COUNT + column;
    if (seaIndex === 0) {
      this.playerMap[index] = [oceanImageUrl];
    } else {
      this.opponentMap[index] = [oceanImageUrl];
    }
  }

  showShipCell(row: Row, column: Column, seaIndex: SeaIndex): void {
    const oceanImageUrl = this.imageProvider.getImage(GameImageType.ocean);
    const index = row * COLUMN_COUNT + column;
    if (seaIndex === 0) {
      const shipUrl = this.imageProvider.getImage(GameImageType.player);
      this.playerMap[index] = [oceanImageUrl, shipUrl];
    } else {
      const shipUrl = this.imageProvider.getImage(GameImageType.opponent);
      this.opponentMap[index] = [oceanImageUrl, shipUrl];
    }
  }

  showMissCell(row: Row, column: Column, seaIndex: SeaIndex): void {
    const oceanImageUrl = this.imageProvider.getImage(GameImageType.ocean);
    const missImageUrl = this.imageProvider.getImage(GameImageType.miss);
    const index = row * COLUMN_COUNT + column;
    if (seaIndex === 0) {
      this.playerMap[index] = [oceanImageUrl, missImageUrl];
    } else {
      this.opponentMap[index] = [oceanImageUrl, missImageUrl];
    }
  }

  showHitCell(row: Row, column: Column, seaIndex: SeaIndex): void {
    const oceanImageUrl = this.imageProvider.getImage(GameImageType.ocean);
    const hitImageUrl = this.imageProvider.getImage(GameImageType.hit);
    const index = row * COLUMN_COUNT + column;
    if (seaIndex === 0) {
      const shipUrl = this.imageProvider.getImage(GameImageType.player);
      this.playerMap[index] = [oceanImageUrl, shipUrl, hitImageUrl];
    } else {
      const shipUrl = this.imageProvider.getImage(GameImageType.opponent);
      this.opponentMap[index] = [oceanImageUrl, shipUrl, hitImageUrl];
    }
  }

  showSunkCell(row: Row, column: Column, seaIndex: SeaIndex): void {
    const oceanImageUrl = this.imageProvider.getImage(GameImageType.ocean);
    const sunkImageUrl = this.imageProvider.getImage(GameImageType.sunk);
    const index = row * COLUMN_COUNT + column;
    if (seaIndex === 0) {
      const shipUrl = this.imageProvider.getImage(GameImageType.player);
      this.playerMap[index] = [oceanImageUrl, shipUrl, sunkImageUrl];
    } else {
      const shipUrl = this.imageProvider.getImage(GameImageType.opponent);
      this.opponentMap[index] = [oceanImageUrl, shipUrl, sunkImageUrl];
    }
  }
}
