import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoodBoardComponent } from './components/mood-board/mood-board';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MoodBoardComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('procedural-worlds-ui');
}

