import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'drivers', loadComponent: () => import('./driver-standings/driver-standings.component') },
  { path: 'constructors', loadComponent: () => import('./constructor-standings/constructor-standings.component') },
  { path: 'settings', loadComponent: () => import('./settings/settings.component') },
  { path: '', redirectTo: '/drivers', pathMatch: 'full' },
  { path: '**', redirectTo: '/drivers' },
];
