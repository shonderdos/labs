import { Component } from '@angular/core';
import { NavigationItemComponent } from '../navigation-item/navigation-item.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-navigation',
  template: `
    <ng-container *ngFor="let item of navigationItems">
      <app-navigation-item [link]="item.link" [name]="item.name"></app-navigation-item>
    </ng-container>
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
    `,
  ],
  imports: [CommonModule, NavigationItemComponent],
})
export class NavigationComponent {
  public navigationItems = [
    {
      name: 'Drivers',
      link: '/drivers',
    },
    {
      name: 'Constructors',
      link: '/constructors',
    },
    {
      name: 'Settings',
      link: '/settings',
    },
  ];
}
