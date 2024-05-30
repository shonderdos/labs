import { Component, inject } from '@angular/core';
import { NavigationItemComponent } from '../navigation-item/navigation-item.component';
import { ButtonComponent } from '../button/button.component';
import { NavigationService } from '../../services/navigation/navigation.service';
import { NetworkIndicatorService } from '../../services/network-indicator/network-indicator.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { map } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [MatIconModule, NavigationItemComponent, ButtonComponent, AsyncPipe, JsonPipe],
})
export class NavigationComponent {
  public navigationService = inject(NavigationService);
  public networkIndicatorService = inject(NetworkIndicatorService);

  public isOnline = this.networkIndicatorService.state$.pipe(map(({ isOnline }) => isOnline));
  public icon = this.networkIndicatorService.state$.pipe(map(({ isOnline }) => (isOnline ? 'cloud' : 'cloud_off')));
  public isShown = this.networkIndicatorService.state$.pipe(map(({ display }) => display));
}
