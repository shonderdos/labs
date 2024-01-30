import { Component, inject } from '@angular/core';
import { NavigationItemComponent } from '../navigation-item/navigation-item.component';
import { ButtonComponent } from '../button/button.component';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [NavigationItemComponent, ButtonComponent],
})
export class NavigationComponent {
  public service = inject(NavigationService);
}
