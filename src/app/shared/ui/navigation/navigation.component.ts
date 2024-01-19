import { Component, inject } from '@angular/core';
import { NavigationItemComponent } from '../navigation-item/navigation-item.component';
import { NAVIGATION_TOKEN } from '../../../app.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [NavigationItemComponent, ButtonComponent],
})
export class NavigationComponent {
  public navigationItems = inject(NAVIGATION_TOKEN);
}
