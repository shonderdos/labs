import { Routes } from '@angular/router';
import LayoutComponent from './layouts/layout.component';
import { isLoggedInAndRedirectGuard, isLoggedInGuard } from './shared/guards/isLogedIn.guard';

export const routes: Routes = [
  // Redirect an empty path to '/drivers'
  { path: '', pathMatch: 'full', redirectTo: '/drivers' },

  //   AUTHENTICATION
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'login',
        canActivate: [isLoggedInAndRedirectGuard('/dashboard')],
        loadComponent: () => import('./authentication/login/login.component'),
      },
    ],
  },
  // DASHBOARD
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'vertical',
    },
    canActivate: [isLoggedInGuard],
    children: [{ path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component') }],
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
    ],
  },

  // redirect to /drivers if no route matches
  { path: '**', redirectTo: '/drivers' },
];
