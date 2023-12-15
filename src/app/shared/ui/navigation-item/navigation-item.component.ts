import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
  imports: [RouterLink, MatIconModule],
})
export class NavigationItemComponent {
  @Input() link: string | undefined;
  @Input() name: string | undefined;
  @Input() icon: string | undefined;
}
