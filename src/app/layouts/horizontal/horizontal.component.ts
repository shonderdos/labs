import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationComponent } from '../../shared/ui/navigation/navigation.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavigationComponent, RouterOutlet],
})
export class HorizontalComponent {}
