import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-navigation-item',
  template: `
    <div role="button" [routerLink]="link">
      <mat-icon class="material-icons-outlined">{{ icon }}</mat-icon>
      <span>{{ name }}</span>
    </div>
  `,
  styles: [
    `
      div {
        display: flex;
        align-items: center;
        border-radius: 6px;
        padding: 0 20px;
        color: var(--navigation-text-color);
        height: 48px;
      }
      div:hover {
        cursor: pointer;
        background-color: var(--navigation-hover-background-color);
      }
      mat-icon {
        margin-right: 10px;
      }
    `,
  ],
  imports: [RouterLink, MatIconModule],
})
export class NavigationItemComponent {
  @Input() link: string | undefined;
  @Input() name: string | undefined;
  @Input() icon: string | undefined;
}
