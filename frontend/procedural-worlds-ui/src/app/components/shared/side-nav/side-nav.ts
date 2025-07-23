import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

interface NavSection {
  title: string;
  icon: string;
  items: NavItem[];
  expanded?: boolean;
}

interface NavItem {
  label: string;
  route?: string;
  icon?: string;
  action?: () => void;
}

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule
  ],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss'
})
export class SideNavComponent {
  navSections = signal<NavSection[]>([
    {
      title: 'World Design',
      icon: 'public',
      expanded: true,
      items: [
        { label: 'Overview', route: '/worlds', icon: 'dashboard' },
        { label: 'Locations', route: '/worlds/locations', icon: 'location_on' },
        { label: 'Factions & Cultures', route: '/worlds/factions', icon: 'groups' },
        { label: 'History & Lore', route: '/worlds/history', icon: 'history_edu' },
        { label: 'Magic Systems', route: '/worlds/magic', icon: 'auto_fix_high' }
      ]
    },
    {
      title: 'Consciousness Design',
      icon: 'psychology',
      expanded: true,
      items: [
        { label: 'Consciousness Seeds', route: '/consciousness-lab/seeds', icon: 'scatter_plot' },
        { label: 'Emergence Patterns', route: '/consciousness-lab/patterns', icon: 'pattern' },
        { label: 'Behavioral Archetypes', route: '/consciousness-lab/archetypes', icon: 'face' },
        { label: 'Memory Structures', route: '/consciousness-lab/memory', icon: 'memory' }
      ]
    },
    {
      title: 'Visual Design',
      icon: 'palette',
      expanded: false,
      items: [
        { label: 'Mood Board', route: '/mood-board', icon: 'photo_library' },
        { label: 'Color Themes', route: '/visual/colors', icon: 'color_lens' },
        { label: 'Architecture Styles', route: '/visual/architecture', icon: 'architecture' }
      ]
    }
  ]);
}
