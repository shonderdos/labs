import { ChangeDetectionStrategy, Component, effect, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../../shared/ui/navigation/navigation.component';
import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { NavigationItemComponent } from '../../shared/ui/navigation-item/navigation-item.component';
import { NAVIGATION_TOKEN } from '../../app.component';

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavigationComponent, RouterOutlet, NavigationItemComponent],
})
export default class VerticalComponent {
  @HostBinding('class') class = 'navigation-closed';
  private state = inject(NavigationService).isOpen;
  public navigationItems = inject(NAVIGATION_TOKEN);
  constructor() {
    effect(() => {
      this.class = this.state() ? 'navigation-opened' : 'navigation-closed';
    });
  }
}
