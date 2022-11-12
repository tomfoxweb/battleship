import { Injectable } from '@angular/core';

export const enum GameImageType {
  ocean,
  miss,
  hit,
  sunk,
  player,
  opponent,
}

interface ImageUrl {
  type: GameImageType;
  url: string;
}

interface GameImage {
  type: GameImageType;
  url: string;
  image: HTMLImageElement;
}

@Injectable({
  providedIn: 'root',
})
export class ImageProviderService {
  private images: Map<GameImageType, HTMLImageElement>;
  private imagesUrlsMap: Map<GameImageType, string>;
  private imageUrlsArray: ImageUrl[];

  constructor() {
    this.images = new Map();
    this.imagesUrlsMap = new Map();
    this.imageUrlsArray = [
      { type: GameImageType.ocean, url: 'assets/images/ocean.png' },
      { type: GameImageType.miss, url: 'assets/images/miss.gif' },
      { type: GameImageType.hit, url: 'assets/images/hit.gif' },
      { type: GameImageType.sunk, url: 'assets/images/sunk.gif' },
      { type: GameImageType.player, url: 'assets/images/player.png' },
      { type: GameImageType.opponent, url: 'assets/images/opponent.png' },
    ];
  }

  async loadImages() {
    const imagePromises: Promise<GameImage>[] = [];
    for (const imageUrl of this.imageUrlsArray) {
      imagePromises.push(
        new Promise<GameImage>(async (resolve) => {
          const image = await this.loadImage(imageUrl.url);
          resolve({ type: imageUrl.type, url: imageUrl.url, image: image });
        })
      );
    }
    const gameImages = await Promise.all(imagePromises);
    gameImages.forEach((gameImage) => {
      this.images.set(gameImage.type, gameImage.image);
      this.imagesUrlsMap.set(gameImage.type, gameImage.url);
    });
  }

  getImage(imageType: GameImageType) {
    return this.imagesUrlsMap.get(imageType)!;
  }

  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve) => {
      const image = new Image();
      image.src = url;
      image.addEventListener('load', () => {
        resolve(image);
      });
    });
  }
}
