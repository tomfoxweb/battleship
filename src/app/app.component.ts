import { Component, OnInit } from '@angular/core';
import { CELL_COUNT, COLUMN_COUNT, ROW_COUNT } from './game/sea';
import { GameImageType, ImageProviderService } from './image-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'battleship';
  playerMap = new Array<string[]>(CELL_COUNT);
  opponentMap = new Array<string[]>(CELL_COUNT);

  constructor(private imageProvider: ImageProviderService) {}

  async ngOnInit() {
    await this.imageProvider.loadImages();
    const oceanImageUrl = this.imageProvider.getImage(GameImageType.ocean);
    const missImageUrl = this.imageProvider.getImage(GameImageType.miss);
    for (let row = 0; row < ROW_COUNT; row++) {
      for (let column = 0; column < COLUMN_COUNT; column++) {
        const index = row * COLUMN_COUNT + column;
        this.playerMap[index] = [oceanImageUrl, missImageUrl];
        this.opponentMap[index] = [oceanImageUrl];
      }
    }
  }
}
