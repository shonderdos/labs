import { Component, inject } from '@angular/core';
import { NavigationItemComponent } from '../navigation-item/navigation-item.component';
import { ButtonComponent } from '../button/button.component';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { NAVIGATION_TOKEN } from '../../../app.component';

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [NavigationItemComponent, ButtonComponent],
})
export class NavigationComponent {
  public navigationItems = inject(NAVIGATION_TOKEN);
  public isLoggedIn = toSignal(inject(AuthService).state.pipe(map(Boolean)));
}
