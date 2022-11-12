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
  image: HTMLImageElement;
}

@Injectable({
  providedIn: 'root',
})
export class ImageProviderService {
  private images: Map<GameImageType, HTMLImageElement>;
  private imageUrls: ImageUrl[];

  constructor() {
    this.images = new Map();
    this.imageUrls = [
      { type: GameImageType.ocean, url: 'assets/images/ocean.gif' },
      { type: GameImageType.miss, url: 'assets/images/miss.gif' },
      { type: GameImageType.hit, url: 'assets/images/hit.gif' },
      { type: GameImageType.sunk, url: 'assets/images/sunk.gif' },
      { type: GameImageType.player, url: 'assets/images/player.png' },
      { type: GameImageType.opponent, url: 'assets/images/opponent.png' },
    ];
  }

  async loadImages() {
    const imagePromises: Promise<GameImage>[] = [];
    for (const imageUrl of this.imageUrls) {
      imagePromises.push(
        new Promise<GameImage>(async (resolve) => {
          const image = await this.loadImage(imageUrl.url);
          resolve({ type: imageUrl.type, image: image });
        })
      );
    }
    const gameImages = await Promise.all(imagePromises);
    gameImages.forEach((gameImage) => {
      this.images.set(gameImage.type, gameImage.image);
    });
  }

  getImage(imageType: GameImageType) {
    return this.images.get(imageType)!;
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
