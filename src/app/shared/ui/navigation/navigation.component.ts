import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navigation',
  template: `
    <a routerLink="/drivers" data-test-id="drivers-link" routerLinkActive="active">Drivers</a>
    <a routerLink="/constructors" data-test-id="constructors-link" routerLinkActive="active">Constructors</a>
    <a routerLink="/settings" data-test-id="settings-link" routerLinkActive="active">Settings</a>
  `,
  styles: [
    `
      :host {
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--navigation-background-color);
        box-shadow: var(--navigation-box-shadow);
      }

      a,
      a:hover,
      a:active,
      a:visited {
        color: var(--navigation-text-color);
        text-decoration: none;
        padding: 0 20px;
      }
    `,
  ],
  imports: [RouterModule],
})
export class NavigationComponent {}
