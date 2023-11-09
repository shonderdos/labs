import { Component } from '@angular/core';
import { NavigationItemComponent } from '../navigation-item/navigation-item.component';

@Component({
  standalone: true,
  selector: 'app-navigation',
  template: `
    @for(item of navigationItems; track item.link){
    <app-navigation-item [link]="item.link" [name]="item.name" />
    }
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
  imports: [NavigationItemComponent],
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
