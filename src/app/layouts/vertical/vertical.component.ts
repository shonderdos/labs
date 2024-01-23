import { ChangeDetectionStrategy, Component, effect, HostBinding, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../../shared/ui/navigation/navigation.component';
import { NavigationService } from '../../shared/services/navigation/navigation.service';

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavigationComponent, RouterOutlet],
})
export default class VerticalComponent {
  @HostBinding('class') class = 'navigation-closed';
  private state = inject(NavigationService).isOpen;
  constructor() {
    effect(() => {
      this.class = this.state() ? 'navigation-opened' : 'navigation-closed';
    });
  }
}
