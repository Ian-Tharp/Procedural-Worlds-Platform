import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mood-board',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mood-board">
      <h1>Mood Board</h1>
      <p>Create visual inspiration boards to guide the aesthetic and consciousness patterns of your worlds.</p>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 2rem;
    }
    h1 {
      color: #536dfe;
    }
  `]
})
export class MoodBoardComponent {} 