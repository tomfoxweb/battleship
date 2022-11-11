import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'battleship';
  playerMap = new Array<number>(81);
  opponentMap = new Array<number>(81);
}
