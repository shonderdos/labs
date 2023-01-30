import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navigation',
  template: `
    <a routerLink="/drivers" data-test-id="drivers-link" routerLinkActive="active">Drivers</a>
    <a routerLink="/constructors" data-test-id="constructors-link" routerLinkActive="active">Constructors</a>
  `,
  styles: [
    `
      :host {
        height: 80px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(15, 23, 42);
        box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
      }

      a,
      a:hover,
      a:active,
      a:visited {
        color: #fff;
        text-decoration: none;
        padding: 0 20px;
      }
    `,
  ],
  imports: [RouterModule],
})
export class NavigationComponent {}
