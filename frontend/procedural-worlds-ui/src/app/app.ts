import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from './components/shared/side-nav/side-nav';
import { TopNavComponent } from './components/shared/top-nav/top-nav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopNavComponent, SideNavComponent],
  template: `
    <div class="app-container">
      <app-top-nav />
      <div class="main-content">
        <app-side-nav />
        <div class="content-area">
          <router-outlet />
        </div>
      </div>
    </div>
  `,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Federated Procedural Worlds Platform');
}

