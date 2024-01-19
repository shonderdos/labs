import { Component, InjectionToken } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export interface Navigation {
  name: string;
  link: string;
  icon: string;
}
export const NAVIGATION_TOKEN = new InjectionToken<Navigation[]>('NavigationToken');

@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'app-root',
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
  template: ` <router-outlet></router-outlet> `,
  styles: [
    `
      :host {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
      }
    `,
  ],
})
export class AppComponent {}
