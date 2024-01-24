import { Routes } from '@angular/router';
import LayoutComponent from './layouts/layout.component';
import { isLoggedInAndRedirectGuard, isLoggedInGuard } from './shared/guards/isLogedIn.guard';
import { NAVIGATION_TOKEN } from './app.component';

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
      {
        path: 'logout',
        canActivate: [isLoggedInGuard],
        loadComponent: () => import('./authentication/logout/logout.component'),
      },
    ],
  },
  // DASHBOARD
  {
    path: '',
    providers: [
      {
        provide: NAVIGATION_TOKEN,
        useValue: [
          {
            name: 'Home',
            link: '/dashboard',
            icon: 'dashboard',
          },
          {
            name: 'Drivers',
            link: '/drivers',
            icon: 'sports_motorsports',
          },
          {
            name: 'Users',
            link: '/users',
            icon: 'group',
          },
          {
            name: 'Series',
            link: '/series',
            icon: 'list_alt',
          },
          {
            name: 'Tracks',
            link: '/track',
            icon: 'circle',
          },
        ],
      },
    ],

    component: LayoutComponent,
    data: {
      layout: 'vertical',
    },
    canActivate: [isLoggedInGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children: [
          {
            path: ':id',
            loadComponent: () => import('./dashboard/driver-details/driver-details.component'),
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./dashboard/driver-edit/driver-edit.component'),
          },
        ],
      },
    ],
  },
  // PUBLIC
  {
    path: '',
    component: LayoutComponent,
    providers: [
      {
        provide: NAVIGATION_TOKEN,
        useValue: [
          {
            name: 'Drivers',
            link: '/drivers',
            icon: 'person',
          },
          {
            name: 'Constructors',
            link: '/constructors',
            icon: 'people',
          },
          {
            name: 'Settings',
            link: '/settings',
            icon: 'settings',
          },
        ],
      },
    ],
    data: {
      layout: 'horizontal',
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
