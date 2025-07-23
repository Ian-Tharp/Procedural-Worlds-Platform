import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/shared/landing-page/landing-page').then(m => m.LandingPageComponent)
  },
  {
    path: 'worlds',
    loadComponent: () => import('./features/world-builder/world-builder').then(m => m.WorldBuilderComponent)
  },
  {
    path: 'commons',
    loadComponent: () => import('./features/commons/commons').then(m => m.CommonsComponent)
  },
  {
    path: 'consciousness-lab',
    loadComponent: () => import('./features/consciousness-lab/consciousness-lab').then(m => m.ConsciousnessLabComponent)
  },
  {
    path: 'mood-board',
    loadComponent: () => import('./features/mood-board/mood-board').then(m => m.MoodBoardComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
