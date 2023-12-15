import { Component, inject } from '@angular/core';
import { NavigationItemComponent } from '../navigation-item/navigation-item.component';
import { NAVIGATION_TOKEN } from '../../../app.component';

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [NavigationItemComponent],
})
export class NavigationComponent {
  public navigationItems = inject(NAVIGATION_TOKEN);
}
