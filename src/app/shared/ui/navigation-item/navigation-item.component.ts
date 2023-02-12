import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navigation-item',
  template: ` <a [routerLink]="link">{{ name }}</a> `,
  styles: [
    `
      a,
      a:hover,
      a:active,
      a:visited {
        color: var(--navigation-text-color);
        text-decoration: none;
        padding: 0 20px;
        height: 48px;
        display: inline-block;
        line-height: 48px;
        border-radius: 6px;
      }

      a:hover {
        background-color: var(--navigation-hover-background-color);
      }
    `,
  ],
  imports: [RouterLink],
})
export class NavigationItemComponent {
  @Input() link: string | undefined;
  @Input() name: string | undefined;
}
