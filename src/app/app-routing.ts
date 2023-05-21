import { Routes } from '@angular/router';
import LayoutComponent from './layouts/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'vertical',
    },
    children: [
      { path: 'drivers', loadComponent: () => import('./driver-standings/driver-standings.component') },
      { path: 'constructors', loadComponent: () => import('./constructor-standings/constructor-standings.component') },
      { path: 'settings', loadComponent: () => import('./settings/settings.component') },
      { path: '', redirectTo: '/drivers', pathMatch: 'full' },
      { path: '**', redirectTo: '/drivers' },
    ],
  },
];
