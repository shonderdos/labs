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
        useValue: {
          top: [
            {
              name: 'Dashboard',
              link: '/dashboard',
              icon: 'dashboard',
            },
            {
              name: 'Drivers',
              link: '/drivers',
              icon: 'sports_motorsports',
            },
            {
              name: 'Teams',
              link: '/teams',
              icon: 'groups',
            },
            {
              name: 'Championships',
              link: '/championships',
              icon: 'emoji_events',
            },
            {
              name: 'Events',
              link: '/events',
              icon: 'calendar_today',
            },
            {
              name: 'Weather',
              link: '/weather',
              icon: 'cloud',
            },
            {
              name: 'Tracks',
              link: '/tracks',
              icon: 'location_on',
            },
          ],
          bottom: [
            {
              name: 'Settings',
              link: '/settings',
              icon: 'settings',
            },
            {
              name: 'Logout',
              link: '/logout',
              icon: 'logout',
            },
          ],
        },
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
        data: { breadcrumb: 'Dashboard' },
        loadComponent: () => import('./dashboard/dashboard.component'),
      },
      {
        path: 'drivers',
        data: { breadcrumb: 'Drivers' },
        children: [
          {
            path: '',
            loadComponent: () => import('./drivers/drivers.component'),
          },
          {
            path: ':id',
            data: { breadcrumb: 'Details' },
            children: [
              {
                path: '',
                loadComponent: () => import('./drivers/driver-details/driver-details.component'),
              },
              {
                path: 'edit',
                data: { breadcrumb: 'Edit' },
                loadComponent: () => import('./drivers/driver-edit/driver-edit.component'),
              },
            ],
          },
        ],
      },
      {
        path: 'weather',
        data: { breadcrumb: 'Weather' },
        loadComponent: () => import('./weather/weather.component'),
      },
      {
        path: 'tracks',
        data: { breadcrumb: 'Tracks' },
        children: [
          {
            path: '',
            loadComponent: () => import('./tracks/tracks.component'),
          },
          {
            path: ':id',
            data: { breadcrumb: 'Details' },
            children: [
              {
                path: '',
                loadComponent: () => import('./tracks/track-details/track-details.component'),
              },
              {
                path: 'edit',
                data: { breadcrumb: 'Edit' },
                loadComponent: () => import('./tracks/track-edit/track-edit.component'),
              },
            ],
          },
        ],
      },
      {
        path: 'teams',
        data: { breadcrumb: 'Teams' },
        children: [
          {
            path: '',
            loadComponent: () => import('./teams/teams.component'),
          },
          {
            path: ':id',
            data: { breadcrumb: 'Details' },
            children: [
              { path: '', loadComponent: () => import('./teams/team-details/team-details.component') },
              {
                path: 'edit',
                data: { breadcrumb: 'Edit' },
                loadComponent: () => import('./teams/team-edit/team-edit.component'),
              },
            ],
          },
        ],
      },
      {
        path: 'championships',
        data: { breadcrumb: 'Championships' },
        children: [
          {
            path: '',
            loadComponent: () => import('./championships/championships.component'),
          },
          {
            path: ':id',
            data: { breadcrumb: 'Details' },
            children: [
              {
                path: '',
                loadComponent: () => import('./championships/championships-details/championships-details.component'),
              },
              {
                path: 'edit',
                data: { breadcrumb: 'Edit' },
                loadComponent: () => import('./championships/championships-edit/championships-edit.component'),
              },
            ],
          },
        ],
      },
      {
        path: 'events',
        data: { breadcrumb: 'Events' },
        children: [
          {
            path: '',
            loadComponent: () => import('./events/events.component'),
          },
          {
            path: ':id',
            data: { breadcrumb: 'Details' },
            children: [
              { path: '', loadComponent: () => import('./events/events-details/events-details.component') },
              {
                path: 'edit',
                data: { breadcrumb: 'Edit' },
                loadComponent: () => import('./events/events-edit/events-edit.component'),
              },
            ],
          },
        ],
      },
      {
        path: 'settings',
        data: { breadcrumb: 'Settings' },
        loadComponent: () => import('./settings/settings.component'),
      },
    ],
  },

  // redirect to /login if no route matches
  { path: '**', redirectTo: '/login' },
];
