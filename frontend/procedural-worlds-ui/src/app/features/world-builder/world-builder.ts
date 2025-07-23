import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-world-builder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './world-builder.html',
  styleUrl: './world-builder.scss'
})
export class WorldBuilderComponent {
  activeConsciousnesses = signal(4);
  locationCount = signal(12);
  factionCount = signal(3);
} 