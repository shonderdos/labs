import { Routes } from '@angular/router';
import LayoutComponent from './layouts/layout.component';
import { isLoggedInGuard } from './shared/guards/isLogedIn.guard';

export const routes: Routes = [
  //   AUTHENTICATION
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [{ path: 'login', loadComponent: () => import('./authentication/login/login.component') }],
  },
  // DASHBOARD
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'vertical',
    },
    canActivate: [isLoggedInGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component') },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: '/dashboard' },
    ],
  },
  // PUBLIC
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
